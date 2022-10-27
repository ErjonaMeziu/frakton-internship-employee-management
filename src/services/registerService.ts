import { prisma } from '../config/prisma';
import { HashPassword } from '../utils/hashPassword.util';

export const RegisterService = {
    register: async (userName: string, userEmail: string, password: string, companyName: string) => 
    {
        const hashedPassword = await HashPassword(password);
        const userData = await prisma.user.create({
            data: {
                name: userName,
                email: userEmail,
                password:hashedPassword,
                register_at: new Date(),
                role: 'CompanyOwner',
                is_approved:false
            },
        });
        const companyData = await prisma.company.create({
            data: {
                userId: userData.id,
                name: companyName,
                joined_at: new Date(),
                updated_at: new Date(),
                logo: "Ss",
            },
        });
        

    },
   
};
