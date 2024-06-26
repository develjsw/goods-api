import { registerAs } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

//const MYSQL_HOST = path.resolve('./secret/development/mysql-host');
const MYSQL_USER_NAME = path.resolve('./secret/development/mysql-username');
const MYSQL_PASSWORD = path.resolve('./secret/development/mysql-password');
const WEBHOOK_SLACK = path.resolve('./secret/development/webhook-slack');

export default registerAs('config-info', () => ({
    port: parseInt(process.env.PORT, 10) || 8002,

    database: {
        mysql: {
            type: 'mysql',
            //host: fs.readFileSync(MYSQL_HOST).toString(),
            host: process.env.MYSQL_HOST_ENV || 'localhost',
            port: 3306,
            username: fs.readFileSync(MYSQL_USER_NAME).toString(),
            password: fs.readFileSync(MYSQL_PASSWORD).toString(),
            database: 'msa',
            entities: ['dist/**/entities/*.entity{.ts,.js}'],
            synchronize: true,
            logging: 'all'
        }
    },
    webhook: {
        slack: {
            url: fs.readFileSync(WEBHOOK_SLACK).toString()
        }
    }
}));
