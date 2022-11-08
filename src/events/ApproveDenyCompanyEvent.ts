import { Event } from './App.event';
import { ApproveDenyRequestSendMailService } from '../services/ApproveDenyRequestSendMailService';

Event.on('approve::deny::company', async (companyOwnerId: number) =>
{
    try
    {
        await ApproveDenyRequestSendMailService.sendmail(companyOwnerId);
        
    } catch (err)
    {
        return { status: 406, data: 'Unacceptable request' };
    }
});
