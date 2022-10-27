import { prisma } from '../config/prisma';
const jwt = require('jsonwebtoken');

export const LoginService = {
    handleLogin: async ( userEmail: string, password: string) =>
    {
        
        const foundUser = await prisma.user.findUnique({
            where: {
                email: userEmail
            }
        });
        if (password === foundUser?.password)
        {
            const roles = foundUser?.role;
            
            const accessToken = jwt.sign(
                {
                    UserInfo: {
                        username: foundUser.name,
                        roles: roles,
                    },
                },
                process.env.ACCESS_TOKEN_SECRET
            );
            console.log(foundUser?.role);
            return accessToken;
        }
       
    },
};
