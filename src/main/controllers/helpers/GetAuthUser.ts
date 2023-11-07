import { Request } from "express";
import { Database } from "../../server/Database";
import { Usuario } from "../../models/entities/persona/Usuario";
import { FactoryUsuario } from "../../models/factories/FactoryUsuario";
import { FactoryParticipante } from "../../models/factories/FactoryParticipante";

export const getAuthUser = async (req: Request) => {

        console.log(req.headers["user"]);
        const userAuth0 = JSON.parse(req.headers["user"] as string);

        let user = await Database.em.findOne(Usuario, { where: {
            email: userAuth0.email,
        }})

        if(user === null || user === undefined) {
            user = await FactoryUsuario.crearUsuario({
                auth0Id: userAuth0.sub,
                nombre: userAuth0.given_name,
                apellido: userAuth0.family_name,
                email: userAuth0.email,
                usuario: userAuth0.nickname,
            });

            const participante = await FactoryParticipante.crearParticipante({
                nombre: userAuth0.given_name,
                apellido: userAuth0.family_name,
                email: userAuth0.email,
                usuario: user
            });

            await Database.em.save(user);
            await Database.em.save(participante);
        }
        return user;
};
