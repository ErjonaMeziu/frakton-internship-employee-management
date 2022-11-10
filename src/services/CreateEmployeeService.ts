import { prisma } from "../config/prisma"
import { HashPassword } from "../utils/hashPassword.util";

export const CreateEmployeeService = {

    
    create: async (userName: string, userEmail: string, password: string, role: string, companyOwnerId: number) =>
    {
        const hashedPassword = await HashPassword(password);
        const userData = await prisma.user.findUnique({
            where: {
                id:companyOwnerId
            },
        });

        const emplData = await prisma.employee.create({
            data: {
                name: userName,
                hired_at: new Date(),
                user_id: companyOwnerId as number,
                company_id: userData?.company_id as number,
                role: role as any,
            },
        });

        if (role == 'CompanyAdmins')
        {
            await prisma.user.create({
                data: {
                    name: userName,
                    email: userEmail,
                    password: hashedPassword,
                    role: role as any,
                    is_approved: true,
                    company_id: userData?.company_id as number,

                }
            })
        }


        return { status: 201, data: "Employee created" };
    }
}