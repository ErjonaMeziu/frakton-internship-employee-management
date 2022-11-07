import { Event } from './App.event';
import { SendMailToPlatformAdminService } from '../services/SendMailToPlatformAdminService';

Event.on('register::company', async (companyData: any) =>
{
    try
    {
        await SendMailToPlatformAdminService.sendmail(companyData);
    } catch (err)
    {
        return { status: 406, data: 'Unacceptable request' };
    }
});
