const express = require("express")
const verifyAdmin = require("../../Middleware/verifyAdmin")
const authorizeRoles = require("../../Middleware/authorizeRoles")
const  router  = express()

router.get('/admin',authorizeRoles("admin"), async (req,res)=>{
    try {

        
        
    } catch (error) {
        console.log(error);
     res.status(500).json({ error: error.message||'Unknown Error' });
        
    }
})