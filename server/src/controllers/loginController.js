const Users = require('../models/Users')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const Login = async (req, res) => {
    const user = await Users.findOne({ email: req.body.email }).lean()
    if (user) {
      try {
        const { email, password } = user;
        const isMatched = await bcrypt.compareSync(req.body.password, password)
        if (email && isMatched) {
          const token = await jwt.sign({ email: req.body.email }, process.env.SECRET_TOKEN);
          user.token = token
          const { password, ...refactoredUserObj } = user
          res.status(200).json({
            msg: "logged in successfully",
            isLogedin: true,
            userData: refactoredUserObj
          })
        }
        else {
          res.status(401).json({
            errorMsg: "Invalid username and password"
          })
        }
      }
      catch (err) {
        console.log(err)
      }
    }
    else {
      res.json({
        errorMsg: "User doesn't exist"
      })
    }
  
  };
  exports.Login = Login;