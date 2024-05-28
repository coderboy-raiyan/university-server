import http, { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { config } from './app/config';

const server: Server = http.createServer(app);

const PORT = config.PORT || 5000;

async function main() {
    try {
        await mongoose.connect(
            config.NODE_ENV === 'development' ? config.DB_URI_DEV : config.DB_URI_PROD
        );
        console.log('DB connected Successfully');

        server.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
main();
