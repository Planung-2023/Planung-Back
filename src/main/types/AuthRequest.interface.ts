import { Request } from "express";

export interface AuthUser {
    sub: string;
    given_name: string;
    nickname: string;
    name: string;
    picture: string;
    locale: string;
    updated_at: string;
    email: string;
    email_verified: boolean;
}

export interface AuthRequest extends Request {
    user: AuthUser;
}
