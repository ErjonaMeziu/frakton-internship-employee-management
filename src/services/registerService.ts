import { prisma } from '../config/prisma';

export const registerService = {
     test: async (userName: string, userEmail: string, password: string,companyName:string) => {
        const userData = await prisma.user.create({
            data: {
                name: userName,
                email: userEmail,
                password: password,
                register_at: new Date(),
                role: 'CompanyOwner',
                isApproved:false
            },
        });
        const companyData = await prisma.company.create({
            data: {
                userId: userData.id,
                name: companyName,
                joined_at: new Date(),
                updatet_at: new Date(),
                logo: "Ss",
            },
        });
        

    },
   
};
