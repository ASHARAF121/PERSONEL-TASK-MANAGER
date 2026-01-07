require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

const mongoose = require('mongoose')

const port = 3000

app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/task-manager').then(()=>{
    console.log('connected to mongoDB')
}).catch(()=>{
    console.log('failed to connect to mongoDB')
})

app.get('/',(req,res)=>{
    res.send('API is running...')
})

const Routes = require('./routes/route')
app.use('/task',Routes)

app.listen(port,()=>{
    console.log(`server running at http://localhost:${port}`)
})