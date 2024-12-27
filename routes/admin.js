    const {Router} = require("express");
    const adminRouter = Router();

    adminRouter.post("/signup", (req,res)=>{
        res.json({message: "signup endpoint"});
    })
    
    adminRouter.post("/signin", (req,res)=>{
        res.json({message: "signup endpoint"});
    })
    
    adminRouter.put("/course", (req,res)=>{
        res.json({message: "preview endpoint"});
    })
    adminRouter.post("/course", (req,res)=>{
        res.json({message: "preview endpoint"});
    })
    
    adminRouter.get("/course/bulk", (req,res)=>{
        res.json({message: "purchase endpoint"});
    })


module.exports = {adminRouter: adminRouter};