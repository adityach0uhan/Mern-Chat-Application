import express from 'express';
const app = express();
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();
import connectDatabase from './database/connectDatabase.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import cookieParser from 'cookie-parser';

app.get('/', (req, res) => {
    res.send('Api working');
});
const corsOptions = {
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectDatabase();
    console.log(`Server is running on port ${PORT}`);
});
