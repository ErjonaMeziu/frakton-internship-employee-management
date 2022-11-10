import { prisma } from '../config/prisma';

export const ExEmployeeService = {
    getEx: async (userId:number) =>
    {
        const userData = await prisma.user.findUnique({
            where: {
                id: userId,
            },
        });
        const emplData = await prisma.employee.findMany({
            where: {
                company_id: userData?.company_id as number,
                AND:[{
                    NOT: {
                        deleted_at: null,
                    }
                }]
            },
            select: {
                name: true,
                hired_at:true,
            },
        });
        
        if (!emplData.length) return { status: 404, data: "No ex employeess" };
        

        return { status: 200, data: emplData };
    },
};
