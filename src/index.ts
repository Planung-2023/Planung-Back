import dotenv from 'dotenv';
import {Server} from "./main/server/Server";
import { Database } from "./main/server/Database";
import { ServerSocket } from './main/server/ServerSocket';

dotenv.config();

const port = process.env.PORT;
const host = process.env.HOST;

const servidor = new Server(port, host);
const servidorSocket = new ServerSocket(servidor);

Database.connect();

servidorSocket.configurarMensajes();

servidor.up();

