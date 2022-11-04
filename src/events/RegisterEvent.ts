import { Event } from './App.event';
import nodemailer from 'nodemailer';

Event.on('register::company', async (company:string) =>
{
    try
    {
        let mailConfig = nodemailer.createTransport({
            host: 'smtpmailhog.frakton.dev',
            port: 1025,
            auth: {
                user: 'mailhog',
                pass: 'MailHog!23',
            }
        })

        await mailConfig.sendMail({
            from: 'employee-managment@frakton.dev',
            to: 'platformAdmin@example.com',
            subject: 'Hello ✔',
            text: `You have a new request to join your platform from ${company}`,
            html: '<b>Hello world?</b>',
        });
    }
    catch (err)
    {
        return { status: 406, data: "Unacceptable request" };
    }
    
});

