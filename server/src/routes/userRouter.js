const express = require('express')
const router = express.Router();
const Users = require('../models/User')

router.post('/register', (req, res) => {

    const { email } = req.body;
    try {
        Users.findOne({ email: email }).then(user => {
            if (user) {
                const message = "email already exists"
                console.log(message)
                res.json({alreadyExists:message})
                return null;
            }
            else {
                console.log("New User")
            }
            const data = Users.create(req.body)

            if (data) {
                res.json({ msg: "user is added" })
            } else {
                res.json({ msg: "something went wrong" })
            }
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
