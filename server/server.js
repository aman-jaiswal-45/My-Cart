const express = require("express");      //Instance of Express
const cookieParser = require("cookie-parser"); //Instance of Cookie-Parser  -> MiddleWare ke liye
const cors = require("cors");              //Instance of Cors  -> Dusre Page mein access ke liye

//------------------------------------------------------------------------//
//Import All Routes from Routes foder
const authRouter = require("./routes/auth/auth-routes");

const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");

const shopProductsRouter = require("./routes/shop/products-routes");
const shopCartRouter = require("./routes/shop/cart-routes");
const shopAddressRouter = require("./routes/shop/address-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const shopSearchRouter = require("./routes/shop/search-routes");
const shopReviewRouter = require("./routes/shop/review-routes");

const commonFeatureRouter = require("./routes/common/feature-routes");
//-------------------------------------------------------------------------//

const app = express();         //Initialise App
const PORT = process.env.PORT || 5000;    //Access Port from .env

//DataBase Connection
const DB = require('./helpers/database');
DB.connectWithDB();

//------------------------------------------------------------------
//CORS :- It is a security feature built into browsers to control how web pages can make requests to a different domain (origin) than the one that served the web page.
const allowedOrigins = [
  "http://localhost:5173",
  "https://my-cart-git-main-aman-jaiswals-projects-6ce0f525.vercel.app"
];

app.use(
  cors({     
    origin: allowedOrigins,    //URL Where our frontend hosted Initially
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
//------------------------------------------------------------------------

//MiddleWares
app.use(cookieParser());
app.use(express.json());    //json format data ko object form me read krne ke liye middleware

//---------------------------------------------------------//
//Mount the Routes
app.use("/api/auth", authRouter);

app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);

app.use("/api/shop/products", shopProductsRouter);
app.use("/api/shop/cart", shopCartRouter);
app.use("/api/shop/address", shopAddressRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/shop/search", shopSearchRouter);
app.use("/api/shop/review", shopReviewRouter);

app.use("/api/common/feature", commonFeatureRouter); 
//-----------------------------------------------------------//

//Listening of PORT
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`)); 

//Default Route
//This route will be hit when no other route matches  
// app.get("/", (req, res) => {
//   res.send("Welcome to the E-commerce API");
// });
//-----------------------------------------------------------//