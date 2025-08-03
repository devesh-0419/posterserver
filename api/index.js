const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const home = require('../Routes/Home/home');
const addCart= require('../Routes/addData/addCart');
const getAllPosters = require('../Routes/getData/getAllPosters');
const getOrders = require('../Routes/getData/getOrders');
const getUserData = require('../Routes/getData/getUserData');
const getAddress = require('../Routes/getData/getAddress');
const getFavorites = require('../Routes/getData/getFavorites');
const addUser= require('../Routes/Auth/addUser');
const addUserAddress= require('../Routes/user/address');
const addUserFavouritePosters= require('../Routes/user/favourites');
const login= require('../Routes/Auth/login');
const logout= require('../Routes/Auth/logout');
// const signInByGoogle= require('../Routes/Auth/signInByGoogle');
const admin= require('../Routes/Admin/admin');
const addPoster= require('../Routes/addData/addPoster');
const addOrder= require('../Routes/addData/addOrder');
const becomeSeller= require('../Routes/seller/becomeSeller');
const app = express(); 
// const serverless = require('serverless-http'); 
const cookieParser = require("cookie-parser"); 
require('dotenv').config();

app.use(cors({
  origin: function (origin, callback) {
    const allowedOrigins = [
      'https://postersell.vercel.app/',
      'https://postersell-o99i0fd0h-devesh0419s-projects.vercel.app/'
    ];
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  // methods: ['GET','HEAD','PUT','PATCH','POST','DELETE'],
  credentials: true,
  // allowedHeaders: ['Content-Type','Authorization','X-Requested-With'],
  // exposedHeaders: ['X-Custom-Auth'],
  // preflightContinue: false 
}));


const allowedOrigins = ['https://postersell.vercel.app', 'https://postersell-o99i0fd0h-devesh0419s-projects.vercel.app'];

app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (allowedOrigins.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
  }

  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204); // Preflight success
  }

  next();
});


app.options('*', cors());
app.use(cookieParser()); 
app.use(express.json());



// app.use(
//   cors({
//     origin:  process.env.FRONTEND_URL2||'https://postersell.vercel.app/',
//     credentials: true,
//   })
// );

// app.use(cors({
//   origin: "*", // Allow all origins (use specific domain in production)
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));
const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.DB_URI,{
  connectTimeoutMS: 10000,
});

// module.exports = serverless(app);
app.listen(process.env.PORT|| 8443 ,(err)=>{
  if(err) console.error(err)
    else
  console.log(`server is up and running on port ${process.env.PORT} or 8443 and db connected`);

})
} catch (error) {
  console.error(error.message) 
}
}
//my middleware

connectDB();


// console.log('Poster land is running..');

app.use('/home',home);
app.use('/posters',getAllPosters);
app.use('/register',addUser);
app.use('/user/address',addUserAddress);
app.use('/user/favourites',addUserFavouritePosters);
app.use('/login',login);
app.use('/logout',logout);
app.use('/addposter',addPoster);
app.use('/addorder',addOrder);
app.use('/addtocart',addCart);
app.use('/orders',getOrders);
app.use('/favourites',getFavorites);
app.use('/addresses',getAddress);
app.use('/dashboard',admin);
app.use('/becomeseller',becomeSeller);
app.use('/userdata',getUserData); 
// app.use('/auth/google',signInByGoogle);


