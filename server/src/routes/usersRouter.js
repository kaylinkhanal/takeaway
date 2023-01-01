const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

router.post('/add-user', async (req, res) => {
    try {
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