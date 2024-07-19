import nodemailer from 'nodemailer'
import { ApiError } from './ApiError.js';



const sendEmail = async function (email) {

    let config = {
        host: 'smtp.gmail.com',
        service: 'gmail',
        post: 587,
        auth: {
            user: process.env.SENDER_EMAIL,
            pass: process.env.SENDER_PASSWORD
        }
    
    }
    let trasporter = nodemailer.createTransport(config);

    let sendMail = await trasporter.sendMail({
        from: process.env.SENDER_EMAIL,
        to: email,
        subject: 'Thanks for contacting',
        test: "Track your expenses here",
        html: '<h3>Thanks for contacting! will get back to you</h3>',
    });

    if(sendEmail) {
        return true
    }
    else {
        throw new ApiError(500, 'Error sending mail!');
    }

}

export {sendEmail};