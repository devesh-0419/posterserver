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
app.use(express.json());
app.use(cookieParser()); 

// const allowedOrigins = [
//   process.env.FRONTEND_URL1 || 'http://localhost:3000',
//   process.env.FRONTEND_URL2 || 'https://postersell.vercel.app/',
//   process.env.FRONTEND_URL3 || 'https://postersell-o99i0fd0h-devesh0419s-projects.vercel.app/'
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
//   credentials: true
// }));



app.use(
  cors({
    origin:  process.env.FRONTEND_URL2||'http://localhost:3000',
    credentials: true,
  })
);

// app.use(cors({
//   origin: "*", // Allow all origins (use specific domain in production)
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   allowedHeaders: ["Content-Type", "Authorization"]
// }));
//my middleware

app.options('*', cors());

const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.DB_URI,{
  connectTimeoutMS: 10000,
});

// console.log('Poster land is running..');

 app.listen(process.env.PORT|| 8443 ,(err)=>{
          if(err) console.error(err)
          else
           console.log(`server is up and running on port ${process.env.PORT} or 8443 and db connected`);
  
      })
} catch (error) {
  console.error(error.message) 
}
}

connectDB();
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



// module.exports = serverless(app);