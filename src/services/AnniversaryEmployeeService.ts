import { prisma } from '../config/prisma';

export const AnniversaryEmployeeService = {
    getAnniversary: async () => {
        const emplData = await prisma.employee.findMany({
            where: {
                hired_at: new Date(),
            },
            
        });

        if (!emplData) return { status: 204, data: 'No anivversay today' };

        return { status: 200, data: emplData };
    },
};
