import { Express } from "express";
import { AsignacionRecursoRoutes } from "./routers/AsignacionRecursoRoutes";
import { CategoriaRecursosRoutes } from "./routers/CategoriaRecursosRoutes";
import { EventosRoutes } from "./routers/EventosRoutes";
import { ParticipantesRoutes } from "./routers/ParticipantesRoutes";
import { PermisosRoutes } from "./routers/PermisosRoutes";
import { RecursosRoutes } from "./routers/RecursosRoutes";
import { RolesRoutes } from "./routers/RolesRoutes";
import { UbicacionRoutes } from "./routers/UbicacionRoutes";
import { UsuariosRoutes } from "./routers/UsuariosRoutes";
import { WelcomeRoutes } from "./routers/WelcomeRoutes";
import { AsistentesRoutes } from "./routers/AsistentesRoutes";

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
        this.app.use("/categoriarecursos", CategoriaRecursosRoutes.router);
        this.app.use("/recursos", RecursosRoutes.router);
        this.app.use("/asignacion-recurso", AsignacionRecursoRoutes.router);
        this.app.use("/asistentes", AsistentesRoutes.router);
    }
}
