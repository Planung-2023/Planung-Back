import { Request } from "express";
import { Usuario } from "../../models/entities/persona/Usuario";
import { Database } from "../../server/Database";

export const getAuthUser = async (req: Request) => {
    const userAuth0 = JSON.parse(req.headers["user"] as string);

    let user = await Database.em.findOne(Usuario, {
        where: {
            email: userAuth0.mail,
        },
    });

    return user!;
};
