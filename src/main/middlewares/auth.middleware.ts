import { NextFunction, Request, Response } from "express";
import { post } from "superagent";
import { ParticipantesApiController } from "../controllers/api/personas/ParticipantesApiController";
import { factoryUsuario } from "../controllers/helpers/FactoryUsuario";
import { Usuario } from "../models/entities/persona/Usuario";
import { Database } from "../server/Database";

export const authValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ msg: "Token de autorización no proporcionado" });
        }

        const token = authorizationHeader.split(" ")[1];
        console.log({ token });

        const existeTokenDb = await Database.em.findOneBy(Usuario, { token });
        console.log({ existeTokenDb });

        if (!existeTokenDb) {
            const response = await post(process.env.AUTH_URL!).auth(token!, {
                type: "bearer",
            });
            if (response.status >= 400) {
                return res.status(401).json({ msg: "Token de autorización no válido" });
            }
            const userAuth0 = {
                ...response.body,
                token,
            };
            await factoryUsuario(userAuth0);

            const participanteDb = await ParticipantesApiController.getParticipanteUsuario(
                userAuth0!.email,
            );
            req.headers["user"] = JSON.stringify(participanteDb);
            return next();
        }

        const participanteDb = await ParticipantesApiController.getParticipanteUsuario(
            existeTokenDb!.email,
        );
        req.headers["user"] = JSON.stringify(participanteDb);
        return next();
    } catch (error) {
        console.log({ error });

        return res.status(500).json({ msg: "Error en la autenticación" });
    }
};

// export const authValidation = async (req: Request, res: Response, next: NextFunction) => {
//     try {
//         const authorizationHeader = req.headers.authorization;

//         if (!authorizationHeader) {
//             return res.status(401).json({ msg: "Token de autorización no proporcionado" });
//         }

//         const token = authorizationHeader.split(" ")[1];

//         // ir a db, buscar usuario por token, si esta, return. si no, a auth0
//         const response = await post(process.env.AUTH_URL!).auth(token!, {
//             type: "bearer",
//         });

//         if (response.status >= 400) {
//             return res.status(401).json({ msg: "Token de autorización no válido" });
//         }
//         console.log("campos: ", { campos: response.body });

//         req.headers["user"] = JSON.stringify(response.body);

//         const userAuth0 = response.body;

//         let user = await Database.em.findOne(Usuario, {
//             where: {
//                 email: userAuth0.email,
//             },
//         });

//         if (user === null || user === undefined) {
//             user = await FactoryUsuario.crearUsuario({
//                 auth0Id: userAuth0.sub,
//                 nombre: userAuth0.given_name,
//                 apellido: userAuth0.family_name,
//                 email: userAuth0.email,
//                 usuario: userAuth0.nickname,
//             });

//             const participante = await FactoryParticipante.crearParticipante({
//                 nombre: userAuth0.given_name,
//                 apellido: userAuth0.family_name,
//                 email: userAuth0.email,
//                 usuario: user,
//             });

//             await Database.em.save(user);
//             await Database.em.save(participante);
//         }

//         next();
//     } catch (error) {
//         return res.status(500).json({ msg: "Error en la autenticación" });
//     }
// };
