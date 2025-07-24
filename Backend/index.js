const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");


const port = 4000;

app.use(express.json());
app.use(cors());

//Database Connection with MongoDB
mongoose.connect("mongodb+srv://meenaljoshi2006:admin@cluster0.abkgr61.mongodb.net/Mandir Mart")

//API Creation

app.get("/",(req,res)=>{
    res.send("Express App is running");

})

//Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename:(req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()} ${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//creating upload endpoint for images
app.use("/images",express.static("upload/images"))
app.post("/upload",upload.single("product"),(re,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })

})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Started");
    } else{
        console/log(error);
    }
});
