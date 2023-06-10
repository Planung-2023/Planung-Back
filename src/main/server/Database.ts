const { readdir } = require("fs").promises;
const dotenv = require("dotenv");
import "reflect-metadata";
import * as path from "path";
import { DataSource, EntityManager } from "typeorm";

export class Database {
  public static AppDataSource: DataSource;
  public static em: EntityManager;
  private static entityPath: string = "./../models/entities";

  private static async prepare() {
    dotenv.config();

    const getFileList = async (dirName: string) => {
      let files: any = [];
      const items = await readdir(dirName, { withFileTypes: true });

      for (const item of items) {
        if (item.isDirectory()) {
          files = [...files, ...(await getFileList(`${dirName}/${item.name}`))];
        } else {
          files.push(`${dirName}/${item.name}`);
        }
      }

      return files;
    };

    const entitiesPath = path.resolve(__dirname, Database.entityPath);
    const allFiles: string[] = await getFileList(entitiesPath);
    let allFilesJsOrTs = allFiles.filter(
      (f: any) => f.endsWith(".js") || f.endsWith(".ts")
    );
    allFilesJsOrTs = allFilesJsOrTs.map((f) => f.replace(entitiesPath, ""));
    let entitiesRead: any = [];

    for (const f of allFilesJsOrTs) {
      const e = await import(Database.entityPath + f).then((res) =>
        Object.values(res)
      );
      entitiesRead.push(e);
    }

    entitiesRead = entitiesRead.flat();

    Database.AppDataSource = new DataSource({
      type: "mysql",
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      logging: process.env.DB_LOGGING === 'true',
      entities: entitiesRead,
      synchronize: process.env.DB_SYNC === 'true',
    });

    Database.em = Database.AppDataSource.manager;
  }

  public static async connect(callback: any = null) {
    await Database.prepare();
    Database.AppDataSource.initialize()
      .then(() => {
        console.log("The DB is connected correctly");
        if(callback !== null) {
          callback();
        }
      })
      .catch((err) => console.log(err));
  }
}
