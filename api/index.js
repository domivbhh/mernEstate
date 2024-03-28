import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config()
import userRouter from './routes/userRoutes.js'

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('Successfully connected to db')
}).catch((err)=>{
    console.log(err)
})

const app=express()

app.listen(3000,()=>{
    console.log('server is running at Port 3000..')
})

// app.get('/test',(req,res)=>{
//     res.json({message:'Hello world'})
// })


app.use('/api/user',userRouter)