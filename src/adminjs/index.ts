import AdminJS from "adminjs";
import AdminJSExpress from "@adminjs/express";
import AdminJSSequelize from "@adminjs/sequelize"
import { sequelize } from "../database";
import { adminJsResources } from "./resources";

import bcrypt from 'bcrypt'
import { locale } from "./locale";
import { Category, Course, Episode, User } from '../models'
import { dashboardOptions } from "./dashboard";
import { brandingOptions } from "./branding";
import { authenticationOptions } from "./authentication";
import { userService } from "../services/userService";

import session from "express-session";
import connectSession from "connect-session-sequelize";
import { ADMINJS_COOKIE_PASSWORD } from "../config/environment";

import {EXPRESS_SESSION_PASSWORD} from "../config/environment";

const SequelizeStore = connectSession(session.Store)
const store = new SequelizeStore({db: sequelize})
store.sync()

AdminJS.registerAdapter(AdminJSSequelize)


export const adminJs = new AdminJS({
    databases:[sequelize],
    rootPath:"/admin",
    resources: adminJsResources,
    branding: brandingOptions,
    locale: locale,
    dashboard: dashboardOptions
})

const sessionOptions = {
  resave: false,
  saveUninitialized: false,
  secret: EXPRESS_SESSION_PASSWORD, 
  cookie: { 
    store: store,
    secure: false, // false para localhost
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 // 24 horas de duração
  }
};

export const adminJSRouter = AdminJSExpress.buildAuthenticatedRouter(
  adminJs,
  {
    // Use as opções que você já tinha importado ou defina aqui
    authenticate: async (email, password) => {
      const user= await userService.findByEmail(email);
      // CUIDADO: Se sua classe 'user' usa bcrypt, use bcrypt.compareSync(password, user.password)
      if (!user) {
        return null;
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (user && isPasswordValid) {
        return user;
      }
      return null;
    },
    // O cookiePassword também deve ser longo!          
      cookiePassword: ADMINJS_COOKIE_PASSWORD,    
  },
  null,
  
  sessionOptions
);