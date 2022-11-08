import { prisma } from '../config/prisma';

export const CurrentEmployeeService = {
    getCurrent: async () => {
        const emplData = await prisma.employee.findMany({
            where: {
                deleted_at: null,
            },
            select: {
                name: true,
                user: {
                    select: {
                        email: true,
                    },
                },
            },
        });

        return { status: 200, data: emplData };
    },
};
