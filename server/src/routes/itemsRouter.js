const express = require("express");
const router = express.Router();
const Items = require("../models/Items");
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/uploads/items')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})
const upload = multer({ storage: storage })
router.post("/items", upload.single('photo'), async (req, res) => {
  try {
    Items.findOne({ catagoryName: req.body.catagoryName }).then((item) => {
      if (!item) {

        const body = req.body;
        const items = new Items({
          catagoryName: body.catagoryName,
          minimumDeliveryPrice: body.minimumDeliveryPrice,
          photo: req.file.filename,
        });
        items.save()

        if (items) {
          res.json({ msg: "Item is added" });
        } else {
          res.json({ msg: "something went worng" });
        }
      }
      else {
        res.status(409).json({ error: "item already exists" });
      }

    });
  } catch (err) {
    console.log(err);
  }
});

router.put("/items", async (req, res) => {
  try {
    const data = await Items.findByIdAndUpdate(req.body._id, req.body)

    if (data) {
      res.status(200).json({ msg: "updated successfully!" })
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/items", async (req, res) => {
  try {
    const data = await Items.find()
    if (data) {
      res.status(200).json({
        validItemOptions: data
      })
    } else {
      res.status(500).json({
        msg: "something went wrong"
      })
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/items", async (req, res) => {
  try {
    const data = await Items.findByIdAndDelete(req.body._id)
    if (data) {
      res.status(204).json({ msg: 'deleted successfully' })
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
