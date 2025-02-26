import express from 'express'

const userRouter = express.Router();

userRouter.post('/login',(req,res) => {
    res.send('Login')
})
userRouter.post('/register',(req,res) => {
    res.send('Register')
})

export {userRouter}