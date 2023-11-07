import { NextFunction, Request, Response } from "express";
import { post } from "superagent";

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

        next();
    } catch (error) {
        return res.status(500).json({ msg: "Error en la autenticación" });
    }
};
