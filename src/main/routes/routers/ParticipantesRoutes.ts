import { Router } from "express";
import { WelcomeController } from "../../controllers/WelcomeController";
import { ParticipantesApiController } from "../../controllers/api/personas/ParticipantesApiController";

export class ParticipantesRoutes {
    public static router: Router;

    static {
        this.router = Router();

        this.router.get("", ParticipantesApiController.index);
        this.router.get("/:id", ParticipantesApiController.getParticipante)
        this.router.get("/:id", ParticipantesApiController.show);
        this.router.put("/:id", ParticipantesApiController.update);
        this.router.post("", ParticipantesApiController.store);
        this.router.delete("/:id", ParticipantesApiController.remove);
    }
}
