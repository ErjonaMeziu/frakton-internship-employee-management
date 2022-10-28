const jwt = require('jsonwebtoken');
import { UserDataModel } from "../interfaces/models/UserData.model";

export const GenerateJWT = (user: UserDataModel) => {
    const payload = {
        role: user.role || 'anonymous',
        user_id: user.id,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN,
        algorithm: process.env.JWT_ALGORITHM,
    });
};