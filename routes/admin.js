    const {Router} = require("express");
    const bcrypt = require("bcrypt");
    const zod = require("zod");
    const {adminmodel} = require("../db.js");
    const {coursemodel} = require("../db.js");
    const jwt = require("jsonwebtoken");
    const adminRouter = Router();
    const {adminmiddleware} = require("../middleware/admin.js");
    const {JWT_SECRET_admin} = require("../config");

    adminRouter.post("/signup", async(req,res)=>{
        let email, password, firstname, lastname = null;
        try {
                ({email, password, firstname, lastname} = req.body);
                let emaival = zod.string().email();
                let pass = zod.string().min(8);
                let newp = null;
                try {
                    if(!emaival.safeParse(email).success){
                        console.log(email);
                        res.status(400).json({message: "Email is invalid"});
                    }
                    else{
                        try {
                            if(!pass.safeParse(password).success){
                                res.status(400).json({message: "Password is too small, minimum of 8 characters are required"});
                            }
                            else{
                                newp = await bcrypt.hash(password,12);
                                try {
                                    await adminmodel.create({email: email, password: newp, firstName:firstname, lastName:lastname});
                                    res.json({
                                        message: "signed up"
                                    });
                                } catch (error) {
                                    res.json({message: error.message});
                                }
                            }
                        } catch (error) {
                            res.json({message: error.message});
                        }
                    }
                } catch (error) {
                    res.json({message: error.message});
                }
        } catch (error) {
            res.json({message: error.message});
        }
        
    })
    
    adminRouter.post("/signin", async(req,res)=>{
        try {
            let {email, password} = req.body;
            let user = await adminmodel.findOne({email: email});
            if(!user){
                res.status(400).json({message: "Email does not exist"});
            }
            else{
                let ver = await bcrypt.compare(password, user.password);
                if(ver){
                    let token = jwt.sign({id: user._id}, JWT_SECRET_admin);
                    res.json({token: token});
                }
                else{
                    res.status(403).json({message: "Invalid credentials"});
                }
            }
        } catch (error) {
            res.status(500).json({message: error.message});
        }
    })
    
    adminRouter.post("/course", adminmiddleware, async(req,res)=>{
        let {title, description, price, imageurl} = req.body;
        creatorId = req.adminid;
        try {
            await coursemodel.create({title: title, description: description, price: price, imageurl:imageurl, creatorId: creatorId});
            res.json({message: "Course posted successfully"});
        } catch (error) {
            res.json({message: error.message});
        }
    })
    
    adminRouter.put("/course", (req,res)=>{
        res.json({message: "preview endpoint"});
    })

    adminRouter.get("/bulk", (req,res)=>{
        res.json({message: "purchase endpoint"});
    })


module.exports = {adminRouter: adminRouter};