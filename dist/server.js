import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";
import { sequelize } from "./database/index.js";
import { adminJs, adminJSRouter } from "./adminjs/index.js";
import { router } from "./routes.js";
//preparado para deploy
const app = express();
app.use(cors());
import fs from "fs";
// Serve AdminJS components bundle explicitly — AdminJS v7's internal
// sendFile with relative .adminjs/ path fails with Express v5 in production.
app.get('/admin/frontend/assets/components.bundle.js', (_req, res) => {
    const bundlePath = path.resolve(process.cwd(), '.adminjs', 'bundle.js');
    console.log('[Bundle Route] HIT! Serving from:', bundlePath);
    if (fs.existsSync(bundlePath)) {
        res.setHeader('Content-Type', 'application/javascript');
        // Desabilitar cache para garantir que mudanças no bundle reflitam imediatamente
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        res.setHeader('Pragma', 'no-cache');
        res.setHeader('Expires', '0');
        const stream = fs.createReadStream(bundlePath);
        stream.pipe(res).on('error', (err) => {
            console.error('[Bundle Route] Stream error:', err);
            res.status(500).end();
        });
    }
    else {
        console.error('[Bundle Route] File not found at:', bundlePath);
        res.status(404).send('Bundle not found');
    }
});
app.use(adminJs.options.rootPath, adminJSRouter);
app.use(express.static('public'));
app.use('/uploads', express.static(path.resolve(import.meta.dirname, '..', 'uploads')));
app.use(express.json());
app.use(router);
const PORT = process.env.PORT || 3000;
async function start() {
    try {
        await sequelize.authenticate();
        console.log("DB connection successful");
        app.listen(PORT, () => {
            console.log(`Server has started successfully at port ${PORT}`);
        });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
// console.log("CARREGOU O SERVER.TS");
// console.log("sequelize:", sequelize);
start();
