const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')


const app = express()
app.use(express.json())
app.use(cors({
    origin:['http://localhost:5173'],
    credentials:true
}))
app.use(cookieParser())

const secretKey = 'yourSecretKey'

app.post('/login',async(req,res)=>{
    const user = await req.body
    const token = await jwt.sign({ user }, secretKey, { expiresIn: '1m' });
    res.cookie('jwt', token, { httpOnly: true, maxAge: 3600000 /* 1 hour */ });

    console.log(req.body,{message:token});
    res.json({message:'login success',token:token})
})



app.listen(5000,()=>{
    console.log('server in running');
})