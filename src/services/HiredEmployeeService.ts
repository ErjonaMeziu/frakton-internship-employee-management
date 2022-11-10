import { prisma } from '../config/prisma';

export const HiredEmployeeService = {
    getHired: async (userId: number) =>
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
                    hired_at: {
                        gt: new Date()
                    }
                }]
                
            },
            select: {
                name: true,
                hired_at:true,
            }
        });
        
        if (!emplData.length) return { status: 404, data: 'No future employeess' };

        return { status: 200, data: emplData };
    },
};
