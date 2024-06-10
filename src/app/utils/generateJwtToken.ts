import jwt from 'jsonwebtoken';
import { config } from '../config';

export const generateAccessToken = (payload: Record<string, unknown>) => {
    return jwt.sign(payload, config.JWT_ACCESS_SECRET, {
        expiresIn: config.JWT_ACCESS_EXPIRES_IN,
    });
};
export const generateRefreshToken = (payload: Record<string, unknown>) => {
    return jwt.sign(payload, config.JWT_REFRESH_SECRET, {
        expiresIn: config.JWT_REFRESH_EXPIRES_IN,
    });
};
