import * as jwt from 'jsonwebtoken';
import { JWT_SECRET, JWT_EXPIRES_IN, JWT_ALGORITHM } from '../config/auth';
import { UserDataModel } from '../interfaces/models/UserData.model';

export const GenerateJWT = (user: UserDataModel) => {
    const payload = {
        role: user.role || 'anonymous',
        user_id: user.id,
    };

    return jwt.sign({ payload }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN, algorithm: JWT_ALGORITHM as jwt.Algorithm });
};
