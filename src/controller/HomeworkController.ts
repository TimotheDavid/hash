import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Exercice } from '../entity/Exercice';
import { Homework } from "../entity/Homework"


export class HomeworkController {

    private HomeworkRepository = getRepository(Homework);
    private ExerciceRepository = getRepository(Exercice);

    async all(req: Request, res: Response, next: NextFunction) {
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

            res.send(exercices)

        }


    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.HomeworkRepository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.HomeworkRepository.save(request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        let HomeworkToRemove = await this.HomeworkRepository.findOne(request.params.id);
        await this.HomeworkRepository.remove(HomeworkToRemove);
    }




}

