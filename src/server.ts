import { AppDataSource } from './config/dataSource';
import app from './app';
import startConsumer from './services/startConsumer';

const PORT = process.env.PORT || 3000;

AppDataSource.initialize()
    .then(()=>{
        console.log('Data Source has been initialised and DB connection has been established');
        // consume and process from topic
        startConsumer('expense_updates') // Replace with your topic name
        .catch(error => console.error('Error starting consumer:', error));
        
        // listen to server
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch(error=> console.log('Error during Database Initialization'));