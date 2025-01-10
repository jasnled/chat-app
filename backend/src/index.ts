import express from 'express';
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';
import dotenv from 'dotenv';
import { errorHandler } from './middleware/error.handler.js';
import cookieParser from 'cookie-parser';

dotenv.config();
const PORT = 5000; 
const app = express();

app.use(cookieParser()); // for parsing cookies
app.use(express.json()); // for parsing application/json   


const router = express.Router();

app.use('/api', router);
router.use('/auth', authRoutes);
router.use('/messages', messagesRoutes);

app.use(errorHandler);

app.get('/',(req,res)=>{
    res.send("Hello world 2");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});

