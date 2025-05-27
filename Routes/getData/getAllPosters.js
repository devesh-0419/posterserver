const express= require('express');
const router = express();
const Posters = require('../../Schema/posterSchema');


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

router.get('/?genre=querie', async (req,res)=>{
  try {
  const id = req.params.id;
    const poster = await Posters.findById(id)
                               .select("imageUrl  title price seller description category _id ");
     
    return  res.json(poster);
    
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