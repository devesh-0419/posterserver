const express= require('express');
const router = express.Router();



router.get('/', async (req, res) => {
   res.send('<h1>Welcome to the Home Page</h1>'); 
});

module.exports = router;