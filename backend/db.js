// connecting with mongoose
// using commonJS modules instead of ES6 modules as we are in NodeJS
const mongoose = require('mongoose')

const mongoURI = "mongodb://127.0.0.1:27017/INotebook"

const connectToMongo = () =>{
    mongoose.connect(mongoURI, ()=>{
        console.log("connected to mongo sucessfully.")
    })
}

module.exports = connectToMongo;