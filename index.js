import express from 'express'
import dotenv from 'dotenv';
import cors from 'cors';
import path from 'path';

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();


import { verifyEmail } from "./helpers/validateEmail.js";
import { sendEmail } from "./helpers/sendEmail.js";
import { ApiError } from "./helpers/ApiError.js";



const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '/client/dist')))

app.get("/test-route", (req, res) => {

    res.json({msg: "API Working"});
});

app.post('/validate-email', async (req, res) => {

    try {
        const { name, email, number } = req.body;
    
        // const isVerified = await verifyEmail(email);
    
        // if(!isVerified) {
        //     throw new ApiError(400, "Email Not Exists");
        // }
    
        // let isEmailSent = await sendEmail(email);
    
        // if(!isEmailSent) {
        //     throw new ApiError(500, "Email Not Sent");
        // }

        res.json({status: 200, isEmailSent, message: "Email Sent"});

    } catch (error) {
        console.log(error.message);
        res.json({status: error.statusCode, message: error.message })
    }

});



app.listen( process.env.PORT || 8000, () => {
    console.log( "App running on PORT: ", process.env.PORT || 8000);
});