import { Router } from "express";
import { RecursosApiController } from "../../controllers/api/recursos/RecursosApiController";
import { EventosApiController } from "../../controllers/api/eventos/EventosApiController";

export class EventosRoutes {
    public static router: Router;

    static {
        this.router = Router();
        this.router.get("/", EventosApiController.index);
        this.router.get("/", EventosApiController.show);
        this.router.put("/", EventosApiController.update);
        this.router.post("/", EventosApiController.store);
        this.router.delete("/", EventosApiController.remove);


        this.router.get("/:id/recursos", RecursosApiController.index);
        this.router.get("/:id/recursos", RecursosApiController.show);
        this.router.put("/:id/recursos", RecursosApiController.update);
        this.router.post("/:id/recursos", RecursosApiController.store);
        this.router.delete("/:id/recursos", RecursosApiController.remove);
    }
}