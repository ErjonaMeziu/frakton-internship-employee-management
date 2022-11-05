 import nodemailer from 'nodemailer';
import { HOST, PORT, USER, PASS } from '../config/mail';

export const MailHog = nodemailer.createTransport({
    host: HOST,
    port: PORT as number,
    secure: false,
    auth: {
        user: USER,
        pass: PASS,
    },
});
    
