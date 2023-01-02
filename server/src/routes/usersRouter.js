const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
router.post('/register', async (req, res) => {
    const {name, address,email,userName,password,confirmPassword,role}=req.body;
    if(!name||!address||!email||!userName||!password||!confirmPassword||!role){
        return res.json({
            error:"please fill up required fields"
        })}
        else if (password !== confirmPassword) {
            return res.json({ error: "Password doesn't match" });
        }
    try {
        const existEmail = await Users.findOne({ email: email});
        const existUser= await Users.findOne({userName:userName});
        if (existUser||existEmail) {
            return res.json({ error: "User already exists" });
        }
        const userData = await Users.create(req.body)
        if (userData) {
            res.json({ msg: 'user is added' })
        } else {
            res.json({ msg: 'something went worng' })
        }
    } catch (err) {
        console.log(err)
    }
})
module.exports = router;