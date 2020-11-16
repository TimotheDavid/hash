import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Homework } from "../entity/Homework"
import * as jwt from "jsonwebtoken";


export class HomeworkController {

    private HomeworkRepository = getRepository(Homework);

    async all(req: Request, res: Response, next: NextFunction) {
        const token = <string>req.headers.authorization.split(' ')[1];
        let data = await this.HomeworkRepository.find();
        if (data.length === 0) {
            res.status(404)
        } else {

            let exercices = await this.HomeworkRepository
                .createQueryBuilder("homework")
                .select(["homework.id", "homework.name", "homework.start_date", "homework.end_date", "exercice.id", "exercice.name", "user.id"])
                .leftJoin("homework.exercices", "exercice")
                .leftJoin("homework.users", "user")
                .getMany();
            let data;
            data = jwt.verify(token, process.env.TOKEN_SECRET);


            let id = exercices[0].users.map(el => {
                if (el.id == data.id) {
                    return true
                }
            });

    

            if (id[0]) {
                res.send(exercices);
            } else {
                res.sendStatus(403);
            }





        }


    }

    async one(request: Request, response: Response, next: NextFunction) {
        const homework = request.params
        let data = await this.HomeworkRepository.find({ id: homework.id });
        if (data.length === 0) {
            response.status(404)
        } else {
            let exercices = await this.HomeworkRepository
                .createQueryBuilder("homework")
                .select(["homework.id", "homework.name", "homework.start_date", "homework.end_date", "exercice.id", "exercice.name", "user.id"])
                .leftJoin("homework.exercices", "exercice")
                .leftJoin("homework.users", "user")
                .where("homework.id = :id", { id: data[0].id })
                .getMany();

            response.send(exercices)
        }
    }

    async save(request: Request, response: Response, next: NextFunction) {
        const data = request.body;

        const infos = {
            name: data.name,
            start_date: data.start_date,
            end_date: data.end_date,
            show_date: data.show_date,
        }

        try {
            await this.HomeworkRepository.save(infos);
            response.sendStatus(200);
        } catch (error) {
            response.sendStatus(500).send({
                "error": "cannot be save"
            })
        }
    }

    async remove(request: Request, response: Response, next: NextFunction) {

        const data = request.params;
        try {
            await this.HomeworkRepository.delete(data.id);
            response.sendStatus(200);
        } catch (error) {
            response.send(500).send({
                "error": "cannot be delete"
            })
        }
    }
}

