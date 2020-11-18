import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";
import {User} from "../entity/User";
import * as jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
export class UserController {

    private userRepository = getRepository(User);

    async all(request: Request, response: Response, next: NextFunction) {
        let data = await this.userRepository.find();

        if (data.length === 0) {
            response.status(404).send({
                "error": "not found"
            })
        } else {
            response.send(data);
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