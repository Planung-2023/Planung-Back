import dotenv from 'dotenv';
import {Server} from "./main/server/Server";

dotenv.config();

const port = process.env.PORT;
const host = process.env.HOST;

const servidor = new Server(port, host);

servidor.up();