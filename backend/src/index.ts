import express from 'express';
import authRoutes from './routes/auth.route.js';
import messagesRoutes from './routes/message.route.js';
import dotenv from 'dotenv';

dotenv.config();
const PORT = 5000; 
const app = express();

app.use(express.json());

const router = express.Router();

app.use('/api', router);
router.use('/auth', authRoutes);
router.use('/messages', messagesRoutes);

app.get('/',(req,res)=>{
    res.send("Hello world 2");
});

app.listen(PORT, ()=>{
    console.log(`Server is running on port: ${PORT}`);
});

