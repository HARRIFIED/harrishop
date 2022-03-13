 const router = require('express').Router();
const User = require('../models/User');
const  CryptoJS = require("crypto-js");
const { verifyTokenAndAuthorization, verifyTokenAndAdmin } = require("../middlewares/verifyWebToken");

//UPDATE USERS
router.put("/update/:id", verifyTokenAndAuthorization, async (req, res) => {
    if (req.body.password) {
        req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString();
    }
    
    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, 
            {
              $set: req.body,
            }, 
            { new: true }
        );
        res.status(201).json(updatedUser)
    } catch (err) {
        res.status(500).json({alert: 'something went wrong'})
    }
});

//DELETE USERS
router.delete("/delete/:id", verifyTokenAndAuthorization, async (req, res) => {
    try{
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({alert: 'user sucessfully deleted'})
    } catch (err) {
        res.status(500).json({alert: 'something went wrong'})
    }
})

//TO BE USED FOR THE ADMIN DASHBOARD

//GET USERS 
router.get("/find/:id", verifyTokenAndAdmin, async (req, res) => {
    try{
        const user = await User.findById(req.params.id);
        
        const { password, ...others } = user._doc;

        res.status(200).json(others);
    } catch (err) {
        res.status(500).json({alert: 'something went wrong'})
    }
})

//GET ALL USERS
router.get("/query", verifyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try{
        const user = query ? await User.find().sort({_id: -1}).limit(5) : await User.find().sort({_id: 1});
        res.status(200).json(user)
    } catch (err) {
        res.status(500).json({alert: 'something went wrong'})
    }
});

//GET USERS STAT
router.get("/query/stats", verifyTokenAndAdmin, async (req, res) => {
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

    try {
        const data = await User.aggregate([
        { $match: { createdAt: { $gte: lastYear } } },
        {
            $project: {
            month: { $month: "$createdAt" },
            },
        },
        {
            $group: {
            _id: "$month",
            total: { $sum: 1 },
            },
        },
        ]);
        res.status(200).json(data)
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;