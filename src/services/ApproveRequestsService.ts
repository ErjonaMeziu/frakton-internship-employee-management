import { prisma } from '../config/prisma';
import { Event } from '../events/App.event';

export const ApproveRequestsService = {
    approveRequests: async (id: number) =>
    {
        const companyData = await prisma.company.findUnique({
            where: {
                id: id,
            },
        });

        if (!companyData) return { status: 404, data: `No requests with id ${id}` };

        await prisma.company.update({
            where: {
                id: id,
            },
            data: {
                joined_at: new Date(),
                updated_at: new Date(),
                status:"active",
                user: {
                    update: {
                        is_approved: true,
                    },
                
                },
            },
        });


        
       //send email to owner
       
      return { status: 200, data: " Approved" };
        
    },
};
