const express = require('express')
const mongoose = require('mongoose')

require('dotenv').config()

const todoRoutes = require('./Routes/todoRoutes')
const app = express()

//middleware

app.use(express.json())

app.use((req,res,next) => {
    console.log(req.path, req.method)
    next()
})

// Routes

app.use('/api/todo', todoRoutes)

//Connecting mongoose

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen((process.env.PORT) ,() =>{
            console.log('Connected to DB and listening ton port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })