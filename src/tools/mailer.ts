const nodemailer = require("nodemailer");

export const sendEmail = async ( object:string, text:string , email:string ) => {

    const transporter = await nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, 
        auth: {
          user: 'tunisia.blackhat@gmail.com',
          pass: '22041998007' 
        },
    }).sendMail({
        from: 'hamzus007jouini@gmail.com' , // sender address
        to: email , // list of receivers
        subject: object, // Subject line
        text: "Hello world? sfdfdsfdsfsdfsdfsdf", // plain text body
        html: text // html body
    },  (error:any, info:any) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });

}

