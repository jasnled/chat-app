import express from 'express';
import authRoutes from './routes/authRoute.js';
import messagesRoutes from './routes/messageRoute.js';

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

