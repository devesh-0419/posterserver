const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const addCart= require('./Routes/addData/addCart');
const getAllPosters = require('./Routes/getData/getAllPosters');
const getUserData = require('./Routes/getData/getUserData');
const addUser= require('./Routes/Auth/addUser');
const login= require('./Routes/Auth/login');
const logout= require('./Routes/Auth/logout');
const signInByGoogle= require('./Routes/Auth/signInByGoogle');
const admin= require('./Routes/Admin/admin');
const addPoster= require('./Routes/addData/addPoster');
const addOrder= require('./Routes/addData/addOrder');
const becomeSeller= require('./Routes/seller/becomeSeller');
const app = express(); 
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

// ✅ Allow OPTIONS method before your routes
app.options('*', cors());

mongoose.connect(process.env.DB_URI).then( 
    app.listen(process.env.PORT|| 8443 ,(err)=>{
        if(err) console.error(err)
        else
           console.log(`server is up and running on port ${process.env.PORT} or 8443 and db connected`);
           
    })
    
).catch(err=>console.error(err));
          


app.use('/posters',getAllPosters);
app.use('/register',addUser);
app.use('/login',login);
app.use('/logout',logout);
app.use('/addposter',addPoster);
app.use('/addorder',addOrder);
app.use('/addtocart',addCart);
app.use('/dashboard',admin);
app.use('/becomeseller',becomeSeller);
app.use('/userdata',getUserData);
app.use('/auth/google',signInByGoogle);