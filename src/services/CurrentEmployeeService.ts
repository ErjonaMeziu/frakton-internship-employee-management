import { prisma } from '../config/prisma';

export const CurrentEmployeeService = {
    getCurrent: async (userId: number) =>
    {
        const userData = await prisma.user.findUnique({
            where: {
                id: userId,
            }
        });
        const emplData = await prisma.employee.findMany({
            where: {
                company_id: userData?.company_id as number,
                AND: [{ deleted_at: null }],
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

        if (!emplData.length) return { status: 404, data: "You dont have current employees" };

        return { status: 200, data: emplData };
    },
};
