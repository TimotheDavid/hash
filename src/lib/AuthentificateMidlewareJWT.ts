import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = <string>req.headers.authorization.split(' ')[1];
    let payload;
    console.log(token.split(' ')[1]);

    try {
        payload = <any>jwt.verify(token, process.env.TOKEN_SECRET);
        res.locals.payload = payload;

    } catch (error) {
        res.sendStatus(401);
        return;
    }

    console.log(token);

    next();



}

module.exports = auth; 