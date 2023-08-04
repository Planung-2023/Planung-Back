import { Router } from "express";
import { RecursosApiController } from "../../controllers/api/recursos/RecursosApiController";
import { EventosApiController } from "../../controllers/api/eventos/EventosApiController";

export class EventosRoutes {
    public static router: Router;

    static {
        this.router = Router();
        this.router.get("/", EventosApiController.index);
        this.router.get("/:id/recursos", RecursosApiController.index);
    }
}