const Users = require('../models/Users')
const bcrypt = require('bcrypt');

const Register = async (req, res) => {
    try {
      const hash = await bcrypt.hashSync(req.body.password, 10);
      Users.findOne({ email: req.body.email }).then((user) => {
        if (!user) {
          req.body.password = hash
          const userData = Users.create(req.body);
          if (userData) {
            res.json({
              isRegistered: true,
              msg: "Your account is successfully Added"
            });
          } else {
            res.json({ errorMsg: "something went worng" });
          }
        } else {
          res.status(409).json({ errorMsg: "user already exists" });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
  exports.Register = Register;