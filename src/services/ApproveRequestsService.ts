import { prisma } from '../config/prisma';
import { Event } from '../events/App.event';

export const ApproveRequestsService = {
    approveRequests: async (id: number) =>
    {
        const companyData = await prisma.company.findUnique({
            where: {
                id,
            },
        });
        
        if (!companyData) return { status: 404, data: `No requests with id ${id}` };

        await prisma.company.update({
            where: {
                id,
            },
            data: {
                joined_at: new Date(),
                updated_at: new Date(),
                status:"active",
            },
        });

        await prisma.user.updateMany({
            where: {
                company_id: id,
            },
            data: {
                is_approved:true,
            }
        });
        
        const owner = await prisma.user.findFirst({
            where: {
                company_id:id
            },
        });

        const status = owner?.is_approved ? 'approved' : 'denied';

        
        Event.emit('approve::deny::company', ({
            companyOwnerEmail: owner?.email,
            companyOwner: owner?.name,
            status,
        }));
        
       return { status: 200, data: " Approved" };
        
    },
};
