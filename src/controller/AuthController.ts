
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import * as bcrypt  from "bcrypt";

//////////////////////////////////////////////////////////

export class AuthController {

    private user = getRepository(User);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async authenticate(req: Request, res: Response) {
        
        // The user logs in using his last used token
        // A new token is generated after each login for security purposes
        // and is sent to user by mail (in the future)
        const {token, password} = await req.body;
        const data = await this.user.find({ access_token: token })
        if (data.length === 0) {
            res.status(403).send({
                "status": "Forbidden"
            });

        } else {

            //verify password
            let password_verify: boolean = bcrypt.compareSync(password, data[0].password);


            // Verifying token
            jwt.verify(token, process.env.TOKEN_SECRET as string, (err: any, user: any) => {
                if (err) return res.sendStatus(403)
                req.user = user
            })


            // Setting up new token for session
            var access_token = await jwt.sign({id: data[0].id}, process.env.TOKEN_SECRET, {expiresIn: '24h'});


            if (password_verify) {


                try {

                    // Update token in db
                    await this.user.update(data[0].id, {

                        access_token: access_token

                    })

                    // Get user role

                    const userWithRole = await this.user
                        .createQueryBuilder("user")
                        .leftJoinAndSelect("user.roles", "role")
                        .where("user.id = :id", {id: data[0].id})
                        .getOne();

                    // Send response with Authorization
                    res.send({
                        "status": "success",
                        "user": userWithRole
                    })

                } catch (error) {

                    console.log(error)

                    res.status(403).send({
                        "status": "Forbidden"
                    })

                }

            } else {
                res.status(403).send({
                    "status":"Forbidden"
                });
            }
        }

    }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async create_token(req: Request, res: Response) {
        const name = req.query.name;
        const surname = req.query.surname;
            var token = await jwt.sign({ name: name, surname: surname }, process.env.SECRET_TOKEN);
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
}



