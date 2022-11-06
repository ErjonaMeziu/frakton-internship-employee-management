import { prisma } from '../config/prisma';
import { Event } from '../events/App.event';

export const DenyRequestsService = {
    denyRequests: async (id: number) =>
    {
        const companyData = await prisma.company.findUnique({
            where: {
                id: id,
            }
        });

        if (!companyData) return { status: 404, data: `No such record to delete` };


        await prisma.company.delete({
            where: {
                id: id,
            },
        });

        //send email to owner
        
        return { status: 200, data: 'Denied' };
    
    },
};
