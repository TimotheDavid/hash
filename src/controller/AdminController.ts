import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { User } from '../entity/User';
import * as jwt from "jsonwebtoken";

export class AdminController {


    private UserRepository = getRepository(User);

    async fill(req: Request, res: Response) {

        // Preload all the existing users
        const users = await this.UserRepository.find();

        let count: number = 0

        try {

            users.forEach(async user => {

                console.log(user.access_token.length)

                // Check for users without a token
                if (user.access_token.length <= 0) {

                    count +=1


                    var token = await jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '72h' });
                        
                    // Update the corresponding user with a token
                    await this.UserRepository.update(user.id, {
    
                        access_token: token
    
                    })
                }
    
            })

            if (count > 0) {
                res.status(200).send(
                    "Successfully update tokens for " + count + " user(s)"
                )
            } else {
                res.status(200).send(
                    "Nothing to update"
                )
            }
            
        } catch {

            res.status(500).send({ error: 'Something failed!' });

        }
        

    }
}

