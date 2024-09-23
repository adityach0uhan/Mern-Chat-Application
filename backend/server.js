import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import connectDatabase from './database/connectDatabase.js';
import userRoutes from './routes/user.route.js';
import chatRoutes from './routes/chat.route.js';
import cookieParser from 'cookie-parser';
app.get('/', (req, res) => {
    res.send('Api working');
});
app.use(cookieParser());
app.use(express.json());

app.use('/api/user', userRoutes);
app.use('/api/chat', chatRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    await connectDatabase();
    console.log(`Server is running on port ${PORT}`);
});
