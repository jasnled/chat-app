import express from 'express';

const router = express.Router();

router.get('/login', (req,res) => {
    res.send('Logged in successfully');
});

router.get('/logout',(req, res) => {
    res.send('Logged out successfully');
});

//http ://<url>/api/auth/signup
router.get('/signup', (req, res) =>{
    res.send('Signed up seccessfully');
});

export default router;