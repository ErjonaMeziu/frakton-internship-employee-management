import { prisma } from '../config/prisma';
import UserModel from '../models/User.model';
import * as jwt from 'jsonwebtoken';
import { ComparePassword } from '../utils/comparePassword.util';
import { GenerateJWT } from '../utils/generateJWT.util';
import { UserDataModel } from '../interfaces/models/UserData.model';

export const LoginService = {
    login: async (userEmail: string, password: string) => {
        const userData = await prisma.user.findUnique({
            where: {
                email: userEmail,
            },
        });
        
        let accessToken;
        if (!userData) return { status: 400, data: 'User not found' };

        const match = await ComparePassword(password, userData.password);
        if (match) {
            accessToken = await GenerateJWT(userData);

            return { status: 200, data: accessToken };
        }

        return { status: 403, data: 'Login Failed:Your userEmail or password is incorrect' };
    },
};
