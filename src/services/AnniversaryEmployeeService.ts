import { prisma } from '../config/prisma';

export const AnniversaryEmployeeService = {
    getAnniversary: async (userId: number) =>
    {
        const userData = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        const emplData = await prisma.employee.findMany({
            where: {
                company_id: userData?.company_id as number,
                AND: [{
                    hired_at: new Date(),
                }]
            },
            
        });
        
        if (!emplData.length) return { status: 404, data:'No anivversay today'};

        return { status: 200, data: emplData };
    },
};
