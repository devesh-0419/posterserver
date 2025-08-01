const express = require('express');
const mongoose = require('mongoose');
// const authorizeRoles = require('../middleware/authorizeRoles');
const cors = require('cors');
const home = require('../Routes/Home/home');
const addCart= require('../Routes/AddData/addCart');
const getAllPosters = require('../Routes/GetData/getAllPosters');
const getOrders = require('../Routes/GetData/getOrders');
const getUserData = require('../Routes/GetData/getUserData');
const getAddress = require('../Routes/GetData/getAddress');
const getFavorites = require('../Routes/GetData/getFavorites');
const addUser= require('../Routes/Auth/addUser');
const addUserAddress= require('../Routes/User/address');
const addUserFavouritePosters= require('../Routes/User/favourites');
const login= require('../Routes/Auth/login');
const logout= require('../Routes/Auth/logout');
const signInByGoogle= require('../Routes/Auth/signInByGoogle');
const admin= require('../Routes/Admin/admin');
const addPoster= require('../Routes/AddData/addPoster');
const addOrder= require('../Routes/AddData/addOrder');
const becomeSeller= require('../Routes/Seller/becomeSeller');
const app = express(); 
const serverless = require('serverless-http'); 
const cookieParser = require("cookie-parser"); 



require('dotenv').config();
app.use(express.json());
app.use(cookieParser()); 

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);


app.options('*', cors());

const connectDB = async ()=>{
  try {
    await mongoose.connect(process.env.DB_URI,{
  connectTimeoutMS: 10000,
});

module.exports = serverless(app);
console.log('Poster land is running..');

//  app.listen(process.env.PORT|| 8443 ,(err)=>{
//         if(err) console.error(err)
//         else
//            console.log(`server is up and running on port ${process.env.PORT} or 8443 and db connected`);
            
//     })
  } catch (error) {
    console.error(error.message) 
  }
}

connectDB();
app.use('/',home);
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
app.use('/auth/google',signInByGoogle);


