import { getRepository } from "typeorm";
import { NextFunction, Request, Response } from "express";
import { User } from '../entity/User';
import * as jwt from "jsonwebtoken";
import { error } from "console";

export class AdminController {


    private UserRepository = getRepository(User);

    async fill(req: Request, res: Response) {

        // Preload all the existing users
        const users = await this.UserRepository.find();

        try {

            users.forEach(async el => {

                // Check for users without a token
                if (el.access_token.length !== 256) {
    
                    var token = await jwt.sign({ name: el.name, surname: el.surname, id: el.id }, "heeee");
                        
                    // Update the corresponding user with a token
                    await this.UserRepository.update(el.id, {
    
                        access_token: token
    
                    })
                }
                    
                    
    
            })
        } catch {

            res.status(500).send({ error: 'Something failed!' });

        }
        

    }
}

