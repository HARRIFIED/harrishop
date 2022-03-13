const router = require('express').Router();
const User = require('../models/User');
const  CryptoJS = require("crypto-js"); //hash password
const jwt = require('jsonwebtoken')


//Register
router.post("/register", async (req, res) => {
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString(),
    });
   
    try{
        (!newUser.email || !newUser.password) &&
            res.status(401).json({alert: 'Please enter your email and password'});

        const savedUser =  await newUser.save()
        res.status(201).json(savedUser);    
    } catch (err) {
        res.status(500).json({alert: `something went wrong`})
    }
});

//LOGIN
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({username: req.body.username});
        (!user) && res.status(401).json({alert: `user does'nt exist`});
        
        const encryptedPassword = CryptoJS.AES.decrypt(user.password, process.env.PASS_SEC);

        const originalPassword = encryptedPassword.toString(CryptoJS.enc.Utf8);
        (originalPassword !== req.body.password) && res.status(401).json('wrong credientials');

        
        const accessToken = jwt.sign({
            id: user._id,
            isAdmin: user.isAdmin,
        }, 
        process.env.JWT_SEC,
        {expiresIn: process.env.JWT_EXP}
        );

        const { password, ...others } = user._doc;

        res.status(200).json({...others, accessToken})
        
    } catch (err) {
        res.status(500).json({alert: `something went wrong ${err}`})
    } 
});

module.exports = router;