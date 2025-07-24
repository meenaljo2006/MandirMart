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
mongoose.connect("mongodb+srv://meenaljoshi2006:admin@cluster0.abkgr61.mongodb.net/MandirMart")

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
app.post("/upload",upload.single("product"),(req,res)=>{

    if (!req.file) {
        return res.status(400).json({
            success: 0,
            message: "No file uploaded. Did you send it with field name 'product'?"
        });
    }

    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })

})

//Schema for creating Products

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:date,
        default:Date.now()
    },
    avilabel:{
        type:Boolean,
        default:true
    }

})

app.post("/addProduct",async(req,res)=>{
    const product = new Product({
        id:req.body.id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
})

app.listen(port,(error)=>{
    if(!error){
        console.log("Server Started");
    } else{
        console.log(error);
    }
});
