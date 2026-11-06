const express =require('express');
const router=express.Router();
const Person = require("./../models/person");
router.post("/", async (req, res) => {
  try {
    const data = req.body; // take a data
    const newPerson = new Person(data); //store the data in newPerson
    const response = await newPerson.save(); //save the data and wait till its saved else err
    console.log("data saved"); // print data saved
    res.status(200).json(response); //respond with 200
  } catch (err) {
    console.log(err); //print error
    res.status(500).json({ error: "internal server rror" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
   
    res.status(200).json(data);
  } catch (err) {
    console.log(err); //print error
    res.status(500).json({ error: "internal server rror" });
  }
});

router.get('//:workType',async (req,res)=>{
        try{
            const workType=req.params.workType;  //extract the work from url
            if(workType=='chef'|| workType=='manager'||workType=='waiter'){
                    const response =await Person.find({work:workType});
                    console.log('response fetched');
                    res.status(200).json(response)
                    }
                    else{
                        res.status(404).json({error:'invalid work type'});
                    }
        }
        catch(err){
            console.log(err); //print error
            res.status(500).json({ error: "internal server rror" });
        }
    
})

router.put('/:id',async (req,res)=>{
    try{
        const personId=req.params.id;
        const updatePersonalData=req.body;
        const response =await Person.findByIdAndUpdate(personId,updatePersonalData ,{
            returnDocument: 'after',
            runValidators:true,
        })
        if(!response){
            return res.status(404).json({error:"Error person not found"});
        }
        console.log('data updated');
        res.status(200).json(response);
    }catch(err){
        console.log(err); //print error
        res.status(500).json({ error: "internal server rror" });
    }
})


router.delete('/:id',async(req,res)=>{
    try{
        const personId=req.params.id;
        const deletePersonalData=req.body;
        const response =await Person.findByIdAndDelete(personId,deletePersonalData,{
            returnDocument :'after',
            runValidators: true
        })
         if(!response){
            return res.status(404).json({error:"Error person not found"});
        }
        console.log('data deleted');
        res.status(200).json({message:'person deleted successfully'});
    }catch(err){
        console.log(err); //print error
            res.status(500).json({ error: "internal server rror" });
    }
})


module.exports=router;