    const {Router} = require("express");
    const bcrypt = require("bcrypt");
    const zod = require("zod");
    const {usermodel} = require("../db.js");
    const userRouter = Router();
    const jwt = require("jsonwebtoken");
    userRouter.post("/signup", async(req,res)=>{
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
                                    await usermodel.create({email: email, password: newp, firstName:firstname, lastName:lastname});
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
    
    userRouter.post("/signin", async(req,res)=>{
        try {
            let {email, password} = req.body;
            let user = await usermodel.findOne({email: email});
            if(!user){
                res.status(400).json({message: "Email does not exist"});
            }
            else{
                let ver = await bcrypt.compare(password, user.password);
                if(ver){
                    let token = jwt.sign({id: user._id}, JWT_SECRET);
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
    
    userRouter.get("/purchases", (req,res)=>{
        res.json({message: "signup endpoint"});
    })


module.exports = {userRouter: userRouter};