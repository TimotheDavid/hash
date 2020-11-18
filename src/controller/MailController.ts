import {Request , Response} from "express";
import * as mail from "nodemailer";


export class MailController{

    async send(request : Request, response:Response){



        let transport  = mail.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'simeon62@ethereal.email',
                pass: '6dkxqWvDSF9dgCTPap'
            }
        })
        const message = {
            from:"simeon62@ethereal.email",
            to:"simeon62@ethereal.email",
            subject: "test",
            text:"test"
        };

        transport.sendMail(message ,(err , info) => {
            if(err) console.log(err)
            console.log(info);
            response.sendStatus(200);
        })


    }




}

