import http, { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import { config } from './app/config';

const server: Server = http.createServer(app);

const PORT = config.PORT || 5000;

async function main() {
    try {
        await mongoose.connect(config.DB_URI);
        console.log('DB connected Successfully');

        server.listen(PORT, () => {
            console.log(`Example app listening on port ${PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}
main();

process.on('unhandledRejection', () => {
    if (server) {
        server.close(() => {
            process.exit(1);
        });
    }
    process.exit(1);
});

process.on('uncaughtException', () => {
    process.exit(1);
});
