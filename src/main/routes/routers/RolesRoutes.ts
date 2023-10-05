import { Router } from "express";
import { RolApiController } from "../../controllers/api/roles/RolApiController";

export class RolesRoutes{

    public static router: Router;

    static {
        this.router = Router();

        this.router.get("/", RolApiController.index);
       
    }
}