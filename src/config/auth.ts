import jwt, { Secret, JwtPayload } from 'jsonwebtoken';
export const JWT_SECRET: Secret =
    process.env.JWT_SECRET ||
    'a2715dabe313c2935ebe875f43b274619298a5f876cd3b5ddea133ab0410a75253fb29ab03bb35b0f51485ab06a258176b9f7cad1efacd3facadf414909f21e1';
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '14d';
export const JWT_ALGORITHM = process.env.JWT_ALGORITHM || 'HS256';
