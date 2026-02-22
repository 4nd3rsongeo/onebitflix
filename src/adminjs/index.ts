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

AdminJS.registerAdapter(AdminJSSequelize)


export const adminJs = new AdminJS({
    databases:[sequelize],
    rootPath:"/admin",
    resources: adminJsResources,
    branding: brandingOptions,
    locale: locale,
    dashboard: dashboardOptions
})


// export const adminJSRouter =  AdminJSExpress.buildRouter(adminJs);
export const adminJSRouter =  AdminJSExpress.buildAuthenticatedRouter(
  adminJs, 
  authenticationOptions, 
  null, 
  {
    resave: false,
    saveUnitialized: true,
    secret: 'senha-do-cookie'
  }
);