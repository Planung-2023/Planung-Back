import { Express } from "express";
import { WelcomeRoutes } from "./routers/WelcomeRoutes";
import { ParticipantesRoutes } from "./routers/ParticipantesRoutes";
import { UsuariosRoutes } from "./routers/UsuariosRoutes";
import { EventosRoutes } from "./routers/EventosRoutes";
import { RolesRoutes } from "./routers/RolesRoutes";
import { PermisosRoutes } from "./routers/PermisosRoutes";
import { UbicacionRoutes } from "./routers/UbicacionRoutes";

export class Router {

    constructor(private app: Express) {
        this.inicializar();
    }

    private inicializar() {
        this.app.use("/welcome", WelcomeRoutes.router);
        this.app.use("/participantes", ParticipantesRoutes.router);
        this.app.use("/usuarios", UsuariosRoutes.router);
        this.app.use("/eventos", EventosRoutes.router);
        this.app.use("/roles", RolesRoutes.router);
        this.app.use("/permisos", PermisosRoutes.router);
        this.app.use("/ubicaciones", UbicacionRoutes.router);

    }
}
