import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from '../entity/User';
import * as jwt from "jsonwebtoken";

export class AdminController {


    private UserRepository = getRepository(User);

    async fill(req: Request, res: Response) {

        const users = await this.UserRepository.createQueryBuilder().select("user").from(User, "user").getMany();

        await users.forEach(async el => {
            if (el.access_token.length < 256) {

                var token = await jwt.sign({ name: el.name, surname: el.surname, id: el.id }, "heeee");
                await this.UserRepository.createQueryBuilder()
                    .update(User)
                    .set({
                        access_token: token
                    }).execute();



            }



        });
        res.send("ok");

    }
}

