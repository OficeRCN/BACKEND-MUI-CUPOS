import "reflect-metadata";
import { DataSource } from "typeorm";

import { User } from "./entity/User";
import { Cupos } from "./entity/Cupos";
import { Configuraciones } from "./entity/Config";
import { Accesos } from "./entity/Accesos";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "123",
  database: "cupos",
  synchronize: true,
  entities: [User, Accesos, Configuraciones, Cupos],
  migrations: [],
  subscribers: [],
});
