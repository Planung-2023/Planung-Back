import { Express } from "express";
import { WelcomeRoutes } from "./routers/WelcomeRoutes";
import { ParticipantesRoutes } from "./routers/ParticipantesRoutes";

export class Router {

    constructor(private app: Express) {
        this.inicializar();
    }

    private inicializar() {
        this.app.use("/welcome", WelcomeRoutes.router);
        this.app.use("/participantes", ParticipantesRoutes.router);
    }
}
