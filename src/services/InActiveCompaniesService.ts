import { prisma } from '../config/prisma';

export const InActiveCompaniesService = {
    getInActive: async () => {
        const companyData = await prisma.company.findMany({
            where: {
                status: 'inactive',
            },
            select: {
                name: true,
                joined_at: true,
            },
        });

        if (!companyData.length) return { status: 204, data: 'No inactive companies' };

        return { status: 200, data: companyData };
    },
};
