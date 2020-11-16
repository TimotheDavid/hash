import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {



    try {
        const token = <string>req.headers.authorization.split(' ')[1];
        let payload;
        payload = <any>jwt.verify(token, process.env.TOKEN_SECRET);
        jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (error) {
        res.sendStatus(401);
        return;
    }
}

module.exports = auth; 