import { request } from "http"

require('dotenv').config()
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { User } from "../entity/User";
import { getConnection, getRepository } from "typeorm";
const jwtSecret = process.env.TOKEN_SECRET

export class AuthController {

    private user = getRepository(User);

    async get_token(req: Request, res: Response) {

        const token = await req.query.token;
        const data = await this.user.createQueryBuilder("user")
            .where("user.access_token = :token", { token: token })
            .getOne();
        res.send(data);

    }

}



