const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
const authRoutes = require("./Routes/AuthRoutes");
const cookieParser = require("cookie-parser");

const bodyParser =  require('body-parser');
const postRoutes = require('./Routes/posts.js') ;

app.listen(4000, ()=>{
    console.log("Server Started with pord 4000");

});

mongoose.connect("mongodb://localhost:27017/quanlydoan",{
    useNewUrlParser: true,
    useUnifiedTopology: true,

}).then(() => {
    console.log("DB Connection Successfull");
}).catch((err) => {
    console.log(err.message);
})

app.use(cors({
    origin:["http://localhost:3000"],
    method:["GET", "POST"],
    credentials:true,
})
);
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use(cookieParser());
app.use(express.json());
app.use("/", authRoutes); 
app.use('/posts', postRoutes);
