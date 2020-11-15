import { Request, Response, NextFunction } from 'express';
import { getRepository } from 'typeorm';
import { Exercice } from '../entity/Exercice';
import { Homework } from "../entity/Homework"


export class HomeworkController {

    private HomeworkRepository = getRepository(Homework);
    private ExerciceRepository = getRepository(Exercice);

    async all(request: Request, response: Response, next: NextFunction) {
        let data = await this.HomeworkRepository.find();
        if (data.length === 0) {
            response.status(404)
        } else {
            let exercices = await this.ExerciceRepository
                .createQueryBuilder("exercices")
                .leftJoinAndSelect("exercices.id", "id")
                .where("homework.id = :id", { id: data[0].id })
                .getMany();

            console.log(exercices);


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

