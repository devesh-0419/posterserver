const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const User = require('../../Schema/userSchema'); // Import your User model
const authorizeRoles = require("../../middleware/authorizeRoles");
 

router.post('/',authorizeRoles("buyer","seller","admin"), async (req, res) => {
  try {

    const { deliveryAddress } = req.body; 
    const { username } = req.user; 
console.log('req.body', req.body);

const user = await User.findOne({ $or: [{ email:username }, { username}] }); 

if (!user) { 
  return res.status(400).json({ error: 'User does not exists' });
}

     user.deliveryAddresses.push(deliveryAddress);
     await user.save();
res.status(200).json({message:'Address Added SuccessFully' });
  } catch (error) {
    console.error("error: ",error.message);
    res.status(500).json({ message : error.message||'Address Update Failed' });
  }
});

router.patch('/address/:index',authorizeRoles("buyer","seller","admin"), async (req, res) => {
  try {
    const { deliveryAddress } = req.body; // Assuming you pass these values in the request body
    const {index} = req.params;
    const { username } = req.user; 
const setQuery = {};
for (const key in deliveryAddress) {
  setQuery[`deliveryAddresses.${index}.${key}`] = deliveryAddress[key];
}
const user = await User.updateOne({ $or: [{ email:username }, { username }] },setQuery);

if (!user) {
  return res.status(400).json({ error: 'User does not exists' });
}
 return res.status(200).json({ message: 'Address Updated SuccessFully' });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message||'Address Update Failed' });
  }
});

router.delete('/address/:index',authorizeRoles("buyer","seller","admin"), async (req, res) => {
  try {
   
    const {index} = req.params;
    console.log('index', index);
    const { username } = req.user; 
const setQuery = {};

const user = await User.findOne({ $or: [{ email:username }, { username }] });

if (!user) {
  return res.status(400).json({ error: 'User does not exists' });
}


user.deliveryAddresses.splice(index, 1);
await user.save();

 return res.status(200).json({ message: 'Address Deleted SuccessFully' });
    
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message||'Address Delete Failed' });
  }
});

module.exports = router;
