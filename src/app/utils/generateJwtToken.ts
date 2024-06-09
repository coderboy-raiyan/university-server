import jwt from 'jsonwebtoken';

const generateJwtToken = (
    payload: Record<string, unknown>,
    tokenSecret: string,
    expiresIn: string = '1d'
) => {
    return jwt.sign(payload, tokenSecret, { expiresIn });
};

export default generateJwtToken;
