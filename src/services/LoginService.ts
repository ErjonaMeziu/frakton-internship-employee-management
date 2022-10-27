import { prisma } from '../config/prisma';
const jwt = require('jsonwebtoken');
import { ComparePassword } from '../utils/comparePassword.util';

export const LoginService = {
    login: async ( userEmail: string, password: string) =>
    {
        
        const foundUser = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });

        const match = await ComparePassword(password, foundUser?.password!);

        if (match)
        {
            const roles = foundUser?.role;
            
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: foundUser?.name,
                        role: roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET
            );
            return accessToken;
        }
       
    },
};
