import { DataSource } from 'typeorm';
// import { User } from '../models/User';
// import { Expense } from '../models/Expense';
import dotenv from 'dotenv';

dotenv.config();

export const AppDataSource = new DataSource({
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'your_db_user',
    password: process.env.DB_PASSWORD || 'your_db_password',
    database: process.env.DB_NAME || 'expense_tracker',
    entities: [],  // Add entities here
    logging: true,
});
