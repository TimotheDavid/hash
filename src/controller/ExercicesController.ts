import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Exercice } from "../entity/Exercice";


export class ExerciceController {

    private ExerciceRepository = getRepository(Exercice);

    async all(request: Request, response: Response, next: NextFunction) {

        let data = await this.ExerciceRepository.find();
        if (data.length === 0) {
            response.status(404)
        } else {
            response.send(data).status(200);
        }
    }

    async one(request: Request, response: Response, next: NextFunction) {
        const exercice = request.params;
        console.log(exercice);

        let data = await this.ExerciceRepository.find({ id: exercice.id });
        if (data.length === 0) {
            response.sendStatus(404)
        } else {
            response.send(data);
        }


    }




}