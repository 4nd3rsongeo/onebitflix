import express from "express";
import { sequelize } from "./database";
import { adminJs, adminJSRouter } from "./adminjs";
import { router } from "./routes";

const app = express();

app.use(adminJs.options.rootPath, adminJSRouter);

app.use(express.static('public'))

app.use(router)

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    await sequelize.authenticate();
    console.log("DB connection successful");

    app.listen(PORT, () => {
      console.log(`Server has started successfully at port ${PORT}`);
    });

  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}
// console.log("CARREGOU O SERVER.TS");
// console.log("sequelize:", sequelize);

start();
