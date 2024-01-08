import {createPool} from 'mysql2/promise';

const pool = createPool({
    host: 'database-rst.cpwiig6c2upx.us-east-2.rds.amazonaws.com',
    user: 'admin',
    password: 'Kero123456',
    database: 'restApi'
});

export default pool;
