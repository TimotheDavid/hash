
require('dotenv').config()
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { User } from "../entity/User";
import { Connection, getRepository } from "typeorm";
import { info } from "console";
const fs = require('fs'); 

const JWT_TOKEN = fs.readFileSync("private.key"); 
export class AuthController {

    private user = getRepository(User);

    async get_token(req: Request, res: Response) {

        const token = await req.query.token;
        const data = await this.user.createQueryBuilder("user")
            .where("user.access_token = :token", { token: token })
            .getOne();
        res.send(data);
    }

    async create_token(req: Request, res: Response) {
        const name = req.query.name;
        const surname = req.query.surname;
        console.log(name);
        console.log(surname);

        const user = await this.user.createQueryBuilder("user")
            .where("name = :name", { name: name })
            .andWhere("surname = :surname", { surname: surname })
            .getOne()
        console.log(user); 

        if (user !== undefined) {
            
            var token = await jwt.sign({ name: user.name, surname: user.surname }, "heeee");

            await this.user.createQueryBuilder("user")
                .insert()
                .into(User)
                .values([{
                    name: user.name,
                    surname: user.surname,
                    access_token: token
                }]).execute();

        } else {
            var token = await jwt.sign({ name: name, surname: surname }, "heeee");
            await this.user.createQueryBuilder("user")
                .insert()
                .into(User)
                .values([
                    {
                        name: name,
                        surname: surname,
                        score: 0,
                        access_token: token
                    }
                ]).execute();
        }








        res.send('ok'); 

    }

}



