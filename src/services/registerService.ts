import { prisma } from '../config/prisma';
import { HashPassword } from '../utils/hashPassword.util';
import { Event } from '../events/App.event'



export const RegisterService = {
    register: async (userName: string, userEmail: string, password: string, companyName: string,logo:string) => 
    {
        const company =await prisma.company.findFirst({
            where: {
                name:companyName
            }
        })
        if (!company)
        {
            const hashedPassword = await HashPassword(password);
            const companyData = await prisma.company.create({
                data: {
                    name: companyName,
                    joined_at: new Date(),
                    updated_at: new Date(),
                    status: 'inactive',
                    logo: logo,
                },
            });
            const userData = await prisma.user.create({
                data: {
                    name: userName,
                    email: userEmail,
                    password: hashedPassword,
                    register_at: new Date(),
                    role: 'CompanyOwner',
                    is_approved: false,
                    company_id:companyData.id,
                },
            });
            

            const admin = await prisma.user.findFirst({
                 where: {
                     role: 'PlatformAdmin',
                 },
             });
            
            Event.emit('register::company', {
                adminEmail: admin?.email,
                companyName,
                companyOwner: userData.name
            });
           
            return { status: 200, data: "Your request to join our platform has been successful." };
        }
        else
        {
           return { status: 409, data: "You cannot register company twice" };
        }
    },
   
};
