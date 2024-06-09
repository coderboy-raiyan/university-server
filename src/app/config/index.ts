import { config as dotEnvConfig } from 'dotenv';
import { join } from 'path';

dotEnvConfig({ path: join(process.cwd(), '.env') });

export const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV as 'development' | 'production',
    DB_URI: process.env.DB_URI,
    STUDENT_DEFAULT_PASSWORD: process.env.STUDENT_DEFAULT_PASSWORD,
    FACULTY_DEFAULT_PASSWORD: process.env.FACULTY_DEFAULT_PASSWORD,
    ADMIN_DEFAULT_PASSWORD: process.env.ADMIN_DEFAULT_PASSWORD,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
    JWT_ACCESS_TOKEN_SECRET: process.env.JWT_ACCESS_TOKEN_SECRET,
    JWT_REFRESH_TOKEN_SECRET: process.env.JWT_REFRESH_TOKEN_SECRET,
};
