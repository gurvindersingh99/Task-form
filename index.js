
const express  = require("express")
const server = express()
const mongoose = require('mongoose')
const cors = require('cors');
const userrouter = require("./router/userrouter");
server.use(express.json())
server.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:3000'], 
    credentials: true 
}));

server.use("/product", userrouter);






mongoose.connect("mongodb://localhost:27017/",{
    dbName:"e_commerce"
}).then(
    ()=>{
        console.log("db connected");
    server.listen(
        "3000",()=>{
    console.log("server started")
        }
    )
    }
).catch(
    ()=>{
        console.log("server not connected")
    }
)

