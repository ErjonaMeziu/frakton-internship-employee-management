import { prisma }  from '../config/prisma';

export const PingService = {
    test: async () => {
       await prisma.user.create({
           data: {
               name: 'John Doe',
               email: 'jondoe@gmail.com',
               register_at: "2022-03-22T16:45:01.246Z",
               role: 'CompanyAdmins'
           },
       });
        
    },
};
