const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const getAllPosters = require('./Routes/getData/getAllPosters');
const addUser= require('./Routes/addData/addUser');
const addPoster= require('./Routes/addData/addPoster');
const addOrder= require('./Routes/addData/addOrder');
const app = express(); 
require('dotenv').config();
app.use(express.json());

app.use(cors());
 

mongoose.connect(process.env.DB_URI).then( 
    app.listen(process.env.PORT|| 8443 ,(err)=>{
        if(err) console.error(err)
        else
           console.log(`server is up and running on port ${process.env.PORT} or 8443 and db connected`);
           
    })
    
).catch(err=>console.error(err));
          


app.use('/posters',getAllPosters);
app.use('/register',addUser);
app.use('/addposter',addPoster);
app.use('/create-order',addOrder);