import { prisma } from '../config/prisma';

export const AllEmployeeService = {
    getAll: async () => {
        const emplData = await prisma.employee.findMany({
            select: {
                name: true,
                hired_at:true,
           }
            ,
        });
        if (!emplData) return { status: 204, data: 'No  employeess' }

        return { status: 200, data: emplData };
    },
};
