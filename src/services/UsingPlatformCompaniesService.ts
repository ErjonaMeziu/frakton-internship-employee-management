import { prisma } from '../config/prisma';
import UserModel from '../models/User.model';
import * as jwt from 'jsonwebtoken';
import { ComparePassword } from '../utils/comparePassword.util';
import { GenerateJWT } from '../utils/generateJWT.util';
import { UserDataModel } from '../interfaces/models/UserData.model';

export const UsingPlatformCompaniesService = {
    getUsingCompanies: async () => {
        const companyData = await prisma.company.findMany({
            where: {
                user: {
                    is_approved: true,
                }
            },
            select: {
                name: true,
                joined_at: true,
                
                },
            });

        if (!companyData) return { status: 204, data: 'No companies using our platform' };

        return { status: 200, data: companyData };
    },
};