import { Event } from './App.event';
import { MailHog } from '../utils/MailHog';
import { FROM_ADDRESS } from '../config/mail';
import { LoadFile } from '../utils/LoadFile';

Event.on('register::company', async ({ adminEmail, companyName, companyOwner }) => {
    console.log(adminEmail);

    try {
        await MailHog.sendMail({
            from: FROM_ADDRESS,
            to: adminEmail,
            html: LoadFile('../views/requestEmail.html', {
                companyName,
                companyOwner,
            }),
        });
    } catch (err) {
        return { status: 406, data: 'Unacceptable request' };
    }
});
