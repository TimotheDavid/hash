import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as dotenv from 'dotenv';
import {Request, Response} from "express";


import {Routes} from "./routes";

createConnection().then(async connection => {

    const cors = require('cors');

    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    var pg = require('pg');
    pg.defaults.ssl = true;
    
    app.use(function(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
        res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
        next();
    })

    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => result !== null && result !== undefined ? res.send(result) : undefined);

            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    dotenv.config();

    // start express server
    app.listen(3000);

    // insert new users for test
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Timber",
    //     lastName: "Saw",
    //     age: 27
    // }));
    // await connection.manager.save(connection.manager.create(User, {
    //     firstName: "Phantom",
    //     lastName: "Assassin",
    //     age: 24
    // }));
    // await connection.manager.save(connection.manager.create(Course, {
    //     name: "tim",
    //     participant: "toto",
    //     age: 21
    // })); 


    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
