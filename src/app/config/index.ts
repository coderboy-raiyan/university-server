import { config as dotEnvConfig } from 'dotenv';
import { join } from 'path';

dotEnvConfig({ path: join(process.cwd(), '.env') });

export const config = {
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
    DB_URI: process.env.DB_URI,
    STUDENT_DEFAULT_PASSWORD: process.env.STUDENT_DEFAULT_PASSWORD,
    BCRYPT_SALT_ROUNDS: process.env.BCRYPT_SALT_ROUNDS,
};
