require('dotenv').config();
const express = require("express");
const app = express();
const mongoose  = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const stripe = require("stripe")(process.env.STRIPE_SECRET);

const port = process.env.PORT;
console.log(port);

app.use(express.json());
app.use(cors());

//Database Connection with MongoDB
const MONGO = process.env.MONGO_URI;
mongoose.connect(MONGO);


//API Creation

app.get("/",(req,res)=>{
    res.send("Express App is running");

})

//Image Storage Engine
const storage = multer.diskStorage({
    destination: "./upload/images",
    filename:(req,file,cb)=>{
        const cleanOriginal = file.originalname.replace(/\s+/g, "_");
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(cleanOriginal)}`)
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
        image_url:`https://mandirmart.onrender.com/images/${req.file.filename}`
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
        type:Date,
        default:Date.now()
    },
    available:{
        type:Boolean,
        default:true
    }

})

app.post("/addProduct",async(req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0){
        let last_product_array =  products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    } else{
        id = 1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    });
    console.log(product);
    await product.save();
    console.log("saved");
    res.json({
        success:true,
        name:req.body.name
    })
})

//Creating API for deleting products
app.post("/removeproduct",async(req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
})

//creating api for getting all products
app.get("/allproducts", async(req,res)=>{
    let products =await Product.find({});
    console.log("All products fetched");
    res.send(products);
})

//schema creating for user model
const Users = mongoose.model("Users",{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true
    },
    password:{
        type:String
    },
    role:{
        type:String,
        default:"buyer"
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now

    }
})

//creating endpoint for registering the user
app.post("/signup",async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with same email"})
    }
    let cart = {};
    for(let i=0;i<300;i++){
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
        role: req.body.role,
    })

    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data,process.env.JWT_SECRET);
    res.json({success:true,token,role:user.role,username:user.name});
})

//creating endpoint for user login
app.post("/login",async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user){
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data ={
                user:{                    
                    id:user.id
                }
            }

            const token = jwt.sign(data,process.env.JWT_SECRET);
            res.json({success:true,token,role: user.role,username:user.name });
        } else{
            res.json({success:false,errors:"Wrong Password"});
        }
    } else{
        res.json({success:false,errors:"Not Registered ! Please Register"});
    }
});

//creating endpoint for related collection
app.get("/relatedCollection",async(req,res)=>{
    let products = await Product.find({});
    const shuffled = products.sort(() => 0.5 - Math.random());
    const relatedCollection = shuffled.slice(0, 4);
    console.log("Related Collection Fetched");
    res.send(relatedCollection);
})

//creating middleware to fetch user
const fetchUser = async(req,res,next)=>{
    const token = req.header("auth-token");
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    } else{
        try{
            const data = jwt.verify(token,process.env.JWT_SECRET);
            req.user = data.user;
            next();

        }catch{
            res.status(401).send({errors:"Please authenticate using a valid token"});

        }
    }
}

//creating endpoint for adding products in cartData
app.post("/addtocart",fetchUser,async(req,res)=>{
    console.log("Added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    const itemId = req.body.itemId.toString();
    const currentCount = Number(userData.cartData[itemId]) || 0;
    userData.cartData[itemId] = currentCount + 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
})

//creating endpoint to remove product from cartData
app.post("/removefromcart",fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
})

//creating endpoint to get cartData
app.post("/getcart",fetchUser,async(req,res)=>{
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
})

//checkout stripe payment
app.post("/create-checkout-session",async(req,res)=>{
    try{
        const {products} =req.body;
        console.log("Products received in backend:", products);

        if (!products || products.length === 0) {
            return res.status(400).json({ error: "No products received" });
        }

        const lineItems = products.map((product) =>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:product.name,
                    images: [product.image.trim().replace(/\s/g, "%20")]

                },
                unit_amount:Math.round(product.price*100),
            },
            quantity:product.quantity
        }));

        const session = await stripe.checkout.sessions.create({
            payment_method_types:["card"],
            line_items:lineItems,
            mode:"payment",

            success_url:"https://mandirmart.vercel.app/payment?status=success",
            cancel_url:"https://mandirmart.vercel.app/payment?status=cancel"
        })

        res.json({id:session.id})

    } catch(err){
        console.error("Stripe Error:", err);
        res.status(500).json({ error: "Payment session creation failed" });
    }
    
})

//After succesful payement cleanCart
app.post("/clearcart", fetchUser, async (req, res) => {
    try {
        const cart = {};
        for (let i = 0; i < 300; i++) {
            cart[i] = 0;
        }
        await Users.findByIdAndUpdate(req.user.id, { cartData: cart });
        res.json({ success: true, message: "Cart cleared" });
    } catch (err) {
        console.error(" Error clearing cart:", err);
        res.status(500).json({ success: false, message: "Server error" });
    }
});



app.listen(port,(error)=>{
    if(!error){
        console.log("Server Started");
    } else{
        console.log(error);
    }
});
