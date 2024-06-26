import { registerAs } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

const MYSQL_HOST = path.resolve('./secret/production/mysql-host');
const MYSQL_USER_NAME = path.resolve('./secret/production/mysql-username');
const MYSQL_PASSWORD = path.resolve('./secret/production/mysql-password');
const WEBHOOK_SLACK = path.resolve('./secret/production/webhook-slack');

export default registerAs('config-info', () => ({
    port: parseInt(process.env.PORT, 10) || 8002,

    database: {
        mysql: {
            type: 'mysql',
            host: fs.readFileSync(MYSQL_HOST).toString(),
            port: 3306,
            username: fs.readFileSync(MYSQL_USER_NAME).toString(),
            password: fs.readFileSync(MYSQL_PASSWORD).toString(),
            database: 'msa',
            entities: ['dist/**/entities/*.entity{.ts,.js}'],
            synchronize: false,
            logging: 'all'
        }
    },
    webhook: {
        slack: {
            url: fs.readFileSync(WEBHOOK_SLACK).toString()
        }
    }
}));
