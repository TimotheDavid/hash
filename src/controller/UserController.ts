import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
       const token = <string>request.headers.authorization.split(' ')[1];

        let data = await this.userRepository.find();
        let tokens;
         tokens = jwt.verify(token,process.env["TOKEN_SECRET"]);

         let user = await this.userRepository.createQueryBuilder("user")
             .select(["user.id"])
             .where("user.name = :name",{name : tokens.name})
             .andWhere("user.surname = :surname", {surname: tokens.surname})
             .getOne();

         let user_verify = data.filter((el) => {
             if(el.id == user.id){
                 return true;
             }
         })

        if(user_verify){
            if (data.length === 0) {
                response.status(404).send({
                    "error": "not found"
                })
            } else {
                response.send(data);
            }
        }else{
            response.sendStatus(403);
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        let data = request.params;

        const user = await this.userRepository.find({ id: data.id });

        response.send(user);
    }
    // create the user with this routes
    async save(request: Request, response: Response, next: NextFunction) {
        const data = request.body;

        const token = await jwt.sign({ name: data.name, surname: data.surname }, process.env.TOKEN_SECRET)
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(data.password,salt)

        const user = await {
            name: data.name,
            surname: data.surname,
            access_token: token,
            score: 0,
            password: hash
        };
    await this.userRepository.save(user);
    response.sendStatus(200);

    }

    async remove(request: Request, response: Response, next: NextFunction) {
        // let userToRemove = await this.userRepository.findOne(request.params.id);
        // await this.userRepository.remove(userToRemove);

        let data = request.params;
        try {
            this.userRepository.delete({ id: data.id })
            response.sendStatus(200);

        } catch (error) {
            response.status(500).send({
                "error": "cannot remove user"
            })
        }


    }

}