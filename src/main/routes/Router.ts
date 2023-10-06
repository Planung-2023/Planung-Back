import { Express } from "express";
import { CategoriaRecursosRoutes } from "./routers/CategoriaRecursosRoutes";
import { EventosRoutes } from "./routers/EventosRoutes";
import { ParticipantesRoutes } from "./routers/ParticipantesRoutes";
import { PermisosRoutes } from "./routers/PermisosRoutes";
import { RolesRoutes } from "./routers/RolesRoutes";
import { UbicacionRoutes } from "./routers/UbicacionRoutes";
import { UsuariosRoutes } from "./routers/UsuariosRoutes";
import { WelcomeRoutes } from "./routers/WelcomeRoutes";

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
        this.app.use("/categoriarecursos", CategoriaRecursosRoutes.router)
    }
}
