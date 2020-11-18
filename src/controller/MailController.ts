import {Request , Response} from "express";
import * as mail from "nodemailer";


export class MailController{
    static send(email: any, token: string): any {

        let transport  = mail.createTransport({
            host: "localhost",
            port: 1025,
            ignoreTLS:true,

        })
        const message = {
            from:"timoth.david@lest",
            to:"password@hatch.eu",
            subject: "test",
            text: `${token}`
        };

        transport.sendMail(message ,(err , info) => {
            if(err) console.log(err)
            console.log(info);

        })

    }











}

