import { Router } from "express";
import { EventosApiController } from "../../controllers/api/eventos/EventosApiController";
import { AsistentesApiController } from "../../controllers/api/personas/AsistentesApiController";
import { RecursosApiController } from "../../controllers/api/recursos/RecursosApiController";

export class EventosRoutes {
    public static router: Router;

    static {
        this.router = Router();
        this.router.get("/", EventosApiController.index);
        this.router.get("/:id", EventosApiController.show);
        this.router.put("/:id", EventosApiController.update);
        this.router.post("/", EventosApiController.store);
        this.router.delete("/:id", EventosApiController.remove);

        // Recursos
        this.router.get("/:id/recursos", RecursosApiController.index);
        //TODO: Revisar  estos metodos (en los metodos se usan params pero en la URL no estan)
        this.router.get("/:id/recursos", RecursosApiController.show);
        this.router.put("/:id/recursos", RecursosApiController.update);
        this.router.post("/:id/recursos", RecursosApiController.store);
        this.router.delete("/:id/recursos", RecursosApiController.remove);

        // Asistentes
        this.router.post("/:id/asistentes", AsistentesApiController.store)
    }
}