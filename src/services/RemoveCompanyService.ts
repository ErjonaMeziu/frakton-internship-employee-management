import { prisma } from '../config/prisma';
import { Event } from '../events/App.event';

export const RemoveCompanyService = {
    remove: async (id: number) => {
        const companyData = await prisma.company.findUnique({
            where: {
                id,
            },
        });
        console.log(companyData);
        if (!companyData) return { status: 404, data: `No record for company with id ${id}` };

        await prisma.company.update({
            where: {
                id,
            },
            data: {
                updated_at: new Date(),
                deleted_at: new Date(),
                status: 'inactive',
            },
        });

        return { status: 200, data: 'Removed' };
    },
};
