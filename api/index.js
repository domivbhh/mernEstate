import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()
import userRouter from './routes/userRoutes.js'
import authRouter from './routes/authRoute.js'
import cookieParser from 'cookie-parser';


mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Successfully connected to db')
}).catch((err)=>{
    console.log(err)
})

const app=express()

app.use(express.json())



app.listen(3000,()=>{
    console.log('server is running at Port 3000..')
})

// app.get('/test',(req,res)=>{
//     res.json({message:'Hello world'})
// })


app.use('/api/user',userRouter)
app.use('/api/auth',authRouter)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  return res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

app.use(cookieParser())