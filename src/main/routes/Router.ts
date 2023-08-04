import { Express } from "express";
import { WelcomeRoutes } from "./routers/WelcomeRoutes";
import { ParticipantesRoutes } from "./routers/ParticipantesRoutes";
import { Usuario } from "../models/entities/persona/Usuario";
import { UsuariosRoutes } from "./routers/UsuariosRoutes";
import { EventosRoutes } from "./routers/EventosRoutes";

export class Router {

    constructor(private app: Express) {
        this.inicializar();
    }

    private inicializar() {
        this.app.use("/welcome", WelcomeRoutes.router);
        this.app.use("/participantes", ParticipantesRoutes.router);
        this.app.use("/usuarios", UsuariosRoutes.router);
        this.app.use("/eventos", EventosRoutes.router);
        

    }
}
