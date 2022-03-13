const router = require('express').Router();
const Product = require('../models/Product');
const { verifyTokenAndAdmin } = require("../middlewares/verifyWebToken");

//CREATE PRODUCTS section
router.post("/add_products", verifyTokenAndAdmin, async (req, res) => {
  const newProduct = new Product(req.body);
  try {
    const savedProduct = await newProduct.save();
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE PRODUCTS section
router.put("/update/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(req.params.id,
      {$set: req.body},
      {new: true}
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

//DELETE PRODUCTS section
router.delete("/delete/:id", verifyTokenAndAdmin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json("product sucessfully deleted")
  } catch (err) {
    res.status(500).json("something went wrong");
  }
});

//GET PRODUCTS
router.get("/find/:id", async (req, res) => {
  try{
    const product = await Product.findById(req.params.id);
    res.status(200).json(product)
  } catch (err) {
    res.status(500).json("something went wrong")
  }
});

//GET ALL PRODUCTS
router.get("/", async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category
  try {
    let products;

    if (qNew) {
      products = await Product.find().sort({createdAt: -1}).limit(1); 
    } else if (qCategory) {
      products = await Product.find({
        categories: {
          $in: [qCategory]
        }
      }).sort({createAt: -1})
    } else {
      products = await Product.find()
    }
    res.status(200).json(products)
  } catch (err) {
    res.status(500).json("something went wrong")
  }
})


module.exports = router;