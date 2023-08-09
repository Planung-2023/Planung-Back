import { Router } from "express";
import { UbicacionApiController } from "../../controllers/api/ubicacion/UbicacionApiController";

export class UbicacionRoutes {
    public static router: Router;

    static{

        this.router= Router()
        this.router.get("", UbicacionApiController.index);
        this.router.get("/:id", UbicacionApiController.show);
        this.router.put("/:id", UbicacionApiController.update);
        this.router.post("", UbicacionApiController.store);
        this.router.delete("/:id", UbicacionApiController.remove);
    }
}