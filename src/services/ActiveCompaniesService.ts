import { prisma } from '../config/prisma';

export const ActiveCompaniesService = {
    getActive: async () => {
        const companyData = await prisma.company.findMany({
            where: {
                status: "active",
            },
            select: {
                name: true,
                joined_at:true,
                
                },
            },
        );

        if (!companyData.length) return { status: 204, data: 'No active companies' };

        return { status: 200, data: companyData };
    },
};
