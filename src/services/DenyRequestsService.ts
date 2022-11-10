import { prisma } from '../config/prisma';
import { Event } from '../events/App.event';

export const DenyRequestsService = {
    denyRequests: async (id: number) =>
    {
        const companyData = await prisma.company.findUnique({
            where: {
                id,
            }
        });

        if (!companyData) return { status: 404, data: `No such record to delete` };


        await prisma.company.delete({
            where: {
                id,
            },
        });

        const owner = await prisma.user.findFirst({
            where: {
                company_id: id,
            },
        });

        const status = owner?.is_approved ? 'approved' : 'denied';
        
        //send email to owner
        Event.emit('approve::deny::company', ({
            companyOwnerEmail: owner?.email,
            companyOwner: owner?.name,
            status,
        }));
        return { status: 200, data: 'Denied' };
    
    },
};
