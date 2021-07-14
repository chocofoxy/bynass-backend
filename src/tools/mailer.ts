const nodemailer = require("nodemailer");

export const sendEmail = ( template:any , email:any ) => {

    const transporter = nodemailer.createTransport({
        host: "smtp-relay.sendinblue.com",
        port: 587,
        secure: false, 
        auth: {
          user: 'hamzus007jouini@gmail.com',
          pass: '03aFNZ4VkqXYz2S5' 
        },
    });
    
    transporter.sendMail({
        from: 'bynass@gmail.com' , // sender address
        to: email , // list of receivers
        subject: " Tynass home confirmation ", // Subject line
        text: "Hello world?", // plain text body
        html: template // html body
    });

}

