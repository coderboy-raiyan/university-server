import { config as dotEnvConfig } from 'dotenv';
import { join } from 'path';

dotEnvConfig({ path: join(process.cwd(), '.env') });

export const config = {
    PORT: process.env.PORT,
    DB_URI: process.env.DB_URI,
};
