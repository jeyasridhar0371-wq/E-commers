const dns = require('dns');
dns.setServers(['1.1.1.1', '8.8.8.8']);
require('dotenv').config();

const express = require('express');
const cors = require("cors")

const app = express();
app.use(cors())
app.use(express.json());

// Firebase connection

// const { initializeApp, cert } = require("firebase-admin/app");

// var serviceAccount = require("./serviceAccountKey.json");

// try {
//   initializeApp({
//     credential: cert(serviceAccount)
//   });
//   console.log("✅ Firebase connected successfully");
// } catch (error) {
//   console.error("❌ Firebase connection failed:", error);
// }


// MongoDB atlas connection

const mongoose = require('mongoose');
const { type } = require('os');
const uri = process.env.MONGODB_URL;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
    await mongoose.connect(uri, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (error) {
    console.log("Failed to connect mongoDB")
  }
}
run().catch(console.dir);

// operations for products
// Create schema and model for product
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    category: {
      type: String
    },

    image: {
      type: String
    }
  },
  {
    timestamps: true
  });

Product = mongoose.model("Product", productSchema);

// endpoind for create product
app.post("/ctrateproduct", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// endpoind for get all product
app.get("/readallproduct", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(201).json(products);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// endpoind for get single product
app.get("/readoneproduct", async (req, res) => {
  try {
    console.log(req.query)
    const product = await Product.findById(req.query.id);
    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// endpoind for update product
app.put("/updateproduct", async (req, res) => {
  try {
    const { _id } = req.body;
    const newproduct = await Product.updateOne({ _id }, { $set: req.body })
    res.status(201).json(newproduct);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// endpoind for delete product
app.delete("/deleteproduct", async (req, res) => {
  try {
    console.log(req.query)
    const { _id } = req.query;
    console.log(_id)
    const result = await Product.deleteOne({ _id });
    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// operations for user
// Create schema and model for user
const userSchema = new mongoose.Schema(
  {
    firebase_uid: {
      type: String
    },
    role: {
      type: Boolean,
      default: false
    }
  }
)

User = mongoose.model("User", userSchema)

// endpoind for store user
app.post("/storeuser", async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// endpoind for get user is admin or client
app.get("/readuser", async (req, res) => {

    try {

        const user = await User.findOne(req.query);

        res.status(200).json(user);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// oprations for cart 
// Create schema and model for cart
const cartSchema = new mongoose.Schema({
  productid: {
    type: String,
    required: true
  },

  userid: {
    type: String,
    required: true
  },

  quantity: {
    type: Number,
    default: 1
  }
});

Cart = mongoose.model("Cart", cartSchema)

// endpoind for get cart exist or not
app.get("/checkcart", async (req, res) => {
  try {
    const { productid, userid } = req.query;

    const cart = await Cart.findOne({
      productid,
      userid: userid   // Checks if userid exists in the array
    });

    res.status(200).json(!!cart);

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});

// endpoind for get all cart
app.get("/readcart", async (req, res) => {
  try {
    const cart = await Cart.find();
    res.status(201).json(cart);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// endpoind for add cart
app.post("/addcart", async (req, res) => {
  try {
    const cart = await Cart.findOne({
      productid: req.body.productid,
      userid: req.body.userid
    });

    if (cart) {

      await Cart.updateOne(
        {
          productid: req.body.productid,
          userid: req.body.userid
        },
        {
          $inc: { quantity: 1 }
        }
      );

    } else {

      await Cart.create({
        productid: req.body.productid,
        userid: req.body.userid,
        quantity: 1
      });

    }
    res.status(200).json(cart);
  } catch (err) {
    res.status(500).json({
      message: err.message
    })
  }
})

// endpoind for remove cart
app.delete("/removecart", async (req, res) => {
    try {

        const { productid, userid } = req.query;

        const result = await Cart.deleteOne({
            productid,
            userid
        });

        res.status(200).json(result);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }
});

// endpoind for Increase Quantity API
app.put("/increasequantity", async (req, res) => {

    try {

        const { productid, userid } = req.body;

        const result = await Cart.updateOne(
            {
                productid,
                userid
            },
            {
                $inc: {
                    quantity: 1
                }
            }
        );

        res.json(result);

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// endpoind for Decrease Quantity API
app.put("/decreasequantity", async (req, res) => {

    try {

        const { productid, userid } = req.body;

        const cart = await Cart.findOne({
            productid,
            userid
        });

        if (!cart)
            return res.status(404).json({
                message: "Cart not found"
            });

        if (cart.quantity > 1) {

            await Cart.updateOne(
                {
                    productid,
                    userid
                },
                {
                    $inc: {
                        quantity: -1
                    }
                }
            );

        } else {

            await Cart.deleteOne({
                productid,
                userid
            });

        }

        res.json({
            message: "Updated"
        });

    } catch (err) {

        res.status(500).json({
            message: err.message
        });

    }

});

// operations for order
// Create schema and model for order
const orderSchema = new mongoose.Schema({

    userid:{
        type:String,
        required:true
    },

    products:[
        {
            productid:String,
            quantity:Number
        }
    ],

    shipping:{
        fullname:String,
        email:String,
        phone:String,
        address:String,
        city:String,
        state:String,
        pincode:String
    },

    paymentMethod:String,

    total:Number,

    status:{
        type:String,
        default:"Pending"
    }

},{
    timestamps:true
});


Order = mongoose.model("Order", orderSchema);

// endpoind for add order history
app.post("/addorder", async(req,res)=>{

    try{

        const order = await Order.create(req.body);

        res.status(201).json(order);

    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});

// endpoind for Clear Cart API
app.delete("/clearcart", async(req,res)=>{

    try{

        const {userid}=req.query;


        const result = await Cart.deleteMany({
            userid
        });


        res.json(result);

    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});

// endpoind for fetch user order
app.get("/readorders", async(req,res)=>{

    try{

        const {userid} = req.query;


        const orders = await Order.find({
            userid
        });


        res.status(200).json(orders);


    }
    catch(err){

        res.status(500).json({
            message:err.message
        });

    }

});

// Start server
app.listen(5000, () => console.log('Server running on port 5000'));
