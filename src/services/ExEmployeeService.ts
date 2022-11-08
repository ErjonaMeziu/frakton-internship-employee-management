import { prisma } from '../config/prisma';

export const ExEmployeeService = {
    getEx: async () =>
    {
        const emplData = await prisma.employee.findMany({
            where: {
                NOT: {
                    deleted_at: null,
                }
            },
        });
        console.log(emplData);
        if (!emplData) return { status: 204, data: "No ex employeess" };
        
        await prisma.employee.findMany({
            where: {
                NOT: {
                    deleted_at: null,
                }
            },
            select: {
                name: true,
                user: {
                    select: {
                        name: true,
                    },
                },
            },
        });

        return { status: 200, data: emplData };
    },
};
