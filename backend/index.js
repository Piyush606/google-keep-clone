const connectToMongo = require("./db")
const express = require('express')
const cors = require('cors')
const app = express()

// to allow cors origin requests
app.use(cors())
// middleware to access the JSON coming in the request body
app.use(express.json())

app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(5000, ()=>{
    console.log("App is listening on port 5000.")
})

connectToMongo()