const express = require('express')
const router = express.Router();
const Register = require('../models/Register')
router.post('/register', async(req, res) => {
    const {name, phoneNumber,email, password, confirmPassword}=req.body;
    if(!name||!phoneNumber||!email||!password||!confirmPassword){
        return res.json({
            error:"please fill up required fields"
        })}
        else if (password !== confirmPassword) {
            return res.json({ error: "Password doesn't match" });
        }
    else{   
        try {
                const existUser = await Register.findOne({ email: email });
                if (existUser) {
                    return res.json({ error: "User already exists" });
                }
                    await Register.create(req.body)
                    res.json({
                        msg:"user created Successfully"
                    })
            }
                catch(err){
                    console.log(err)
                }
    }
 })
 module.exports = router;
