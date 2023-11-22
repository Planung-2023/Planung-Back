import { NextFunction, Request, Response } from "express";
import { post } from "superagent";
import { factoryUsuario } from "../controllers/helpers/FactoryUsuario";
import { Usuario } from "../models/entities/persona/Usuario";
import { FactoryParticipante } from "../models/factories/FactoryParticipante";
import { FactoryUsuario } from "../models/factories/FactoryUsuario";
import { Database } from "../server/Database";

export const authCookie = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarioCookie = req.cookies.user;

        if (usuarioCookie) {
            req.headers["user"] = usuarioCookie;
            return next();
        }

        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({ msg: "Token de autorización no proporcionado" });
        }
        const token = authorizationHeader.split(" ")[1];

        const response = await post(process.env.AUTH_URL!).auth(token!, {
            type: "bearer",
        });
        if (response.status >= 400) {
            return res.status(401).json({ msg: "Token de autorización no válido" });
        }

        req.headers["user"] = JSON.stringify(response.body);

        const userAuth0 = response.body;

        await factoryUsuario(userAuth0);
        res.cookie("user", JSON.stringify(response.body), { httpOnly: true });
        next();
    } catch (error) {
        next(error);
    }
};

export const authValidation = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authorizationHeader = req.headers.authorization;

        if (!authorizationHeader) {
            return res.status(401).json({ msg: "Token de autorización no proporcionado" });
        }

        const token = authorizationHeader.split(" ")[1];
        const response = await post(process.env.AUTH_URL!).auth(token!, {
            type: "bearer",
        });

        if (response.status >= 400) {
            return res.status(401).json({ msg: "Token de autorización no válido" });
        }

        req.headers["user"] = JSON.stringify(response.body);

        const userAuth0 = response.body;

        let user = await Database.em.findOne(Usuario, {
            where: {
                email: userAuth0.email,
            },
        });

        if (user === null || user === undefined) {
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
                usuario: user,
            });

            await Database.em.save(user);
            await Database.em.save(participante);
        }

        next();
    } catch (error) {
        return res.status(500).json({ msg: "Error en la autenticación" });
    }
};
