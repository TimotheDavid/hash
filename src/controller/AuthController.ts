
import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken';
import { User } from "../entity/User";
import { getRepository } from "typeorm";
import * as bcrypt  from "bcrypt";


//////////////////////////////////////////////////////////

export class AuthController {

    private user = getRepository(User);

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

    async authenticate(request: Request, response: Response) {
        
        // The user logs in using his last used token
        // A new token is generated after each login for security purposes
        // and is sent to user by mail (in the future)
        const {name, surname, email, password} = await request.body;

        const data = await this.user.createQueryBuilder("user")
            .where("user.name = :name", {name: name})
            .andWhere("surname = :surname",{surname: surname})
            .andWhere("email = :email",{email : email})
            .getOne();
        if (!data) {
            response.status(403).send({
                "status": "Forbidden"
            });

        } else {


            //verify password
            let password_verify: boolean = await new Promise<boolean>((resolve, reject) => {
                bcrypt.compare(password, data.password, (err, res) => {
                    if(err) reject(err)
                    resolve(res);
                })
            })

           // Setting up new token for session
            var access_token = await jwt.sign({id: data.id}, process.env.TOKEN_SECRET, {expiresIn: '24h'});


            if (password_verify) {
                try {

                    // Update token in db
                    await this.user.update(data.id, {

                        access_token: access_token

                    })

                    // Get user role

                    const userWithRole = await this.user
                        .createQueryBuilder("user")
                        .leftJoinAndSelect("user.roles", "role")
                        .where("user.id = :id", {id: data.id})
                        .getOne();

                    // Send response with Authorization
                    response.send({
                        "status": "success",
                        "user": userWithRole
                    })

                } catch (error) {

                    console.log(error)

                    response.status(403).send({
                        "status": "Forbidden"
                    })

                }

            } else {
                response.status(403).send({
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
    async verify(request: Request, response: Response) {
        const {token} = request.params;
        if (token) {

            try {
                let user = await this.user.createQueryBuilder("user")
                    .where("user.access_token = :token", {token: token})
                    .getOne();

                await this.user.update(user.id, {
                    active: true
                })
                response.sendStatus(200);
            }catch(error){
                response.sendStatus(404);
            }
        }
    }

}



