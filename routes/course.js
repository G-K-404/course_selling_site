    const {Router} = require("express");
    const courseRouter = Router();
    
    courseRouter.get("/preview", (req,res)=>{
        res.json({message: "preview endpoint"});
    })
    
    courseRouter.post("/purchase", (req,res)=>{
        res.json({message: "purchase endpoint"});
    })


module.exports = {courseRouter: courseRouter};