import { Event } from './App.event';
import { MailHog } from '../utils/MailHog';
import { FROM_ADDRESS } from '../config/mail';
import { LoadFile } from '../utils/LoadFile';

Event.on('approve::deny::company', async ({ companyOwnerEmail, companyOwner,status }) =>
{
    try
    {
        await MailHog.sendMail({
            from: FROM_ADDRESS,
            to: companyOwnerEmail,
            html: LoadFile('../views/approveDenyRequest.html', {
                companyOwner,
                status,
            }),
        });
        
    } catch (err)
    {
        return { status: 406, data: 'Unacceptable request' };
    }
});
