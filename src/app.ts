import express from 'express';
import cors from 'cors';
import {json, urlencoded} from 'express';
// import {errorHandler} from './middlewares/errorHandler';
// import userRoutes from './routes/userRoutes';
// import expenseRoutes from './routes/expenseRoutes';

const app = express();

app.use(cors);
app.use(json());
app.use(urlencoded({extended : true}));


//  API Routes
// app.use('/api/users',userRoutes);
// app.use('/api/expenses',expenseRoutes);


// Error handling middleware
// app.use(errorHandler);

export default app;

