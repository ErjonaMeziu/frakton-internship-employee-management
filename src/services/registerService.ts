import { prisma } from '../config/prisma';
import { HashPassword } from '../utils/hashPassword.util';
import {Event} from '../events/App.event'

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
                is_approved:false,
            },
        });
        const companyData = await prisma.company.create({
            data: {
                userId: userData.id,
                name: companyName,
                joined_at: new Date(),
                updated_at: new Date(),
                status:"inactive",
                logo: "Ss",
            },
        });
        const data = {
            companyOwner: userData.name,
            companyName:companyData.name,
        }
        Event.emit('register::company', (data));
        return { status: 200, data: "Your request to join our platform has been successful." };
        
    },
   
};
