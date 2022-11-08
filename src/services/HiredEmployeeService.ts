import { prisma } from '../config/prisma';

export const HiredEmployeeService = {
    getHired: async () => {
        const emplData = await prisma.employee.findMany({
            where: {
                hired_at: {
                    gt:new Date()
                }
                
            },
        });
        
        if (!emplData) return { status: 204, data: 'No future employeess' };

        return { status: 200, data: emplData };
    },
};
