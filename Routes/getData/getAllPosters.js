const express= require('express');
const router = express();
const Posters = require('../../Schema/posterSchema');

router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.val;
    const page = parseInt(req.query.pageNumber)|1;
    const perPage = 10;
    const skip = (page-1)*perPage;
    // for (let key in req.query) {
    //   query[key] = { $regex: req.query[key], $options: "i" }; // case-insensitive partial match
    // }
   
    
   const posters = await Posters.find({
  $or: [
    { title: { $regex: searchTerm, $options: "i" } },
    { category: { $regex: searchTerm, $options: "i" } },
    { description: { $regex: searchTerm, $options: "i" } },
    // add more keys if you want
  ],
})
.skip(skip)
.limit(perPage)
.select("imageUrl title price seller description category _id");

    return res.json(posters);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ unsuccessfull: true });
  }
});

router.get('/', async (req,res)=>{
  try {
    const page = parseInt(req.query.pageNumber)|1;
    const perPage = 10;
    const skip = (page-1)*perPage;
    const posters = await Posters.find({})
                               .skip(skip)
                               .limit(perPage)
                               .select("imageUrl  title price seller category _id ");
     
    return  res.json(posters);
    
  } catch (error) { 
    return res.json({unsuccessfull:true});
  }
});




router.get('/:id', async (req,res)=>{
  try {
  const id = req.params.id;
    const poster = await Posters.findById(id)
                               .select("imageUrl  title price seller description category _id ");
     
    return  res.json(poster);
    
  } catch (error) { 
    return res.json({unsuccessfull:true});
  }
});





module.exports = router; 