import dotenv from 'dotenv';
import {Server} from "./main/server/Server";
import { Database } from "./main/server/Database";

dotenv.config();

const port = process.env.PORT;
const host = process.env.HOST;

const servidor = new Server(port, host);

Database.connect();

servidor.up();