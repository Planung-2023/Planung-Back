import { Router } from "express";
import { EventosApiController } from "../../controllers/api/eventos/EventosApiController";

export class EventosRoutes {
    public static router: Router;

    static {
        this.router = Router();
                                    //RecursosApiController
        this.router.get("", EventosApiController.index);
        
    }
}