import path from "path";
// Set ADMIN_JS_TMP_DIR to an absolute path BEFORE AdminJS modules load.
// AdminJS's constants.js uses this env var to resolve entry.js and bundle.js paths.
// With a relative path (.adminjs/), Express v5's sendFile fails in production.
// This preload module runs via --import, before any application modules.
process.env.ADMIN_JS_TMP_DIR = path.resolve(process.cwd(), '.adminjs');
