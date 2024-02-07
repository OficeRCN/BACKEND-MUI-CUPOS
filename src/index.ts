import "reflect-metadata";
import app from "./app";
import { AppDataSource } from "./data-source";

async function main() {
  try {
    await AppDataSource.initialize();
    app.listen(3000);
    console.log("Escuchando papi, azótame con las peticiones");
  } catch (error) {
    if (error instanceof Error) {
      return console.log(`Error: ${error.message}`);
    }
  }
}

main();