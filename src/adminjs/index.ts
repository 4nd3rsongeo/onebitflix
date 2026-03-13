import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize";
import componentLoader from "./component-loader.js"; 
import path from "path";
import fs from "fs";

// 1. Registre o adaptador APENAS UMA VEZ
// @ts-ignore — adminjs v6 CJS types are not fully compatible with NodeNext
AdminJS.registerAdapter(AdminJSSequelize);

import { sequelize } from "../database/index.js";
import { adminJsResources } from "./resources/index.js";
import { locale } from "./locale.js";
import { dashboardOptions } from "./dashboard.js";
import { brandingOptions } from "./branding.js";
import { authenticationOptions } from "./authentication.js";

import session from "express-session";
import connectSession from "connect-session-sequelize";
import { EXPRESS_SESSION_PASSWORD } from "../config/environment.js";

// 2. Configuração da Store de Sessão
const SequelizeStore = connectSession(session.Store);
const store = new SequelizeStore({ db: sequelize });

// @ts-ignore — adminjs v6 CJS types are not fully compatible with NodeNext
export const adminJs = new AdminJS({
  databases: [sequelize],
  rootPath: "/admin",
  resources: adminJsResources,
  branding: brandingOptions,
  locale: locale,
  dashboard: dashboardOptions,
  componentLoader,
  // Este caminho resolve para a raiz do projeto (onde está o package.json)
  // tanto rodando de 'src' quanto de 'dist'.
  projectRoot: path.resolve(import.meta.dirname, '..', '..'),
  env: {
    // SEMPRE 'development' aqui para o AdminJS.
    // Isso garante que o bundle de 55KB funcione em qualquer modo.
    NODE_ENV: 'development'
  }
} as any);

// Usamos o watch() pois no Windows ele é mais resiliente para garantir
// que o bundle.js seja lido corretamente pelo Express.
adminJs.watch();

const sessionOptions: session.SessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: EXPRESS_SESSION_PASSWORD,
  store: store, 
  cookie: {
    secure: false, 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 
  }
};

// @ts-ignore — @adminjs/express v5 CJS types are not fully compatible with NodeNext
export const adminJSRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  authenticationOptions,
  null,
  sessionOptions,
  {
    maxFileSize: 1024 * 1024 * 1024, // 1GB
    maxFieldsSize: 1024 * 1024 * 1024, // 1GB
    uploadDir: path.resolve(process.cwd(), 'uploads', 'temp'),
    keepExtensions: true,
  } as any
);