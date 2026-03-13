import "dotenv/config";

import { adminJs } from "./index.js";

async function build() {
  console.log('AdminJS: Iniciando bundling manual de produção...');
  try {
    await adminJs.initialize();
    console.log('AdminJS: Bundle de produção gerado com sucesso!');
    process.exit(0);
  } catch (error) {
    console.error('AdminJS: Erro durante o bundling:', error);
    process.exit(1);
  }
}

build();