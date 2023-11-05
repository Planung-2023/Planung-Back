import { Request } from "express";

export const getAuthUser = (req: Request) => {
    if (req.headers && req.headers["user"]) {
        console.log(req.headers["user"]);
        return JSON.parse(req.headers["user"] as string);
    }

    return null;
};
