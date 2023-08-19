const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const User = require('../models/User')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = 'somethingsomething';

//ROUTE#1: Create a user using POST "api/auth/createuser". No login required. STARTS HERE
router.post('/createuser', [
    body('name', 'Enter a valid Name.').isLength({ min: 3 }),
    body('email', 'Enter a valid Email.').isEmail(),
    body('password', 'Password length should be 5 characters minimum.').isLength({ min: 5 }),
], async (req, res) => {
    //If there are no errors, run this and create a user.
    try {
        const result = validationResult(req);
        if (result.isEmpty()) {
            //check whether a user with the same email exists already
            let user = await User.findOne({ email: req.body.email });
            if (user) {
                //Don't create a user as it already exists
                return res.status(400).json({ error: "Sorry! A user with the same email already exists" })
            }
            //create user if it didn't exist

            //converting password to hash starts here
            const salt = await bcrypt.genSalt(10);
            const secPassword = await bcrypt.hash(req.body.password, salt);
            //converting password to hash ends here

            user = await User.create({
                name: req.body.name,
                email: req.body.email,
                password: secPassword
            })
            //using JWT to auithenticate starts here
            const data = {
                user: {
                    //taking user id because its unique index
                    id: user.id
                }
            }
            var authtoken = jwt.sign(data, JWT_SECRET);
            res.json({ authtoken });
            //using JWT to auithenticate ends here

        }
        else {
            //incase errors occur
            return res.status(400).json({ errors: result.array() });
        }
    } catch (error) {
        console.log({ error: error.message });
        res.status(500).send("Internal server error");
    }
});
//ROUTE#1: Create a user using POST "api/auth/createuser". No login required. ENDS HERE

//ROUTE#2: Create a user using POST "api/auth/login". STARTS HERE
router.post('/login', [
    body('email', 'Enter a valid Email.').isEmail(),
    body('password', 'Password should not be empty!').exists(),
], async (req, res) => {
    //If there are no errors, run this and LOGIN a user.
    try {
        const errors = validationResult(req);
        if (errors.isEmpty()) {
            const { email, password } = req.body;
            //check whether a user with the same email exists already
            let user = await User.findOne({ email });
            //Incase user does not already exists, show this error
            if (!user) {
                return res.status(400).json({ error: "Please try to login with correct credentials!" })
            }
            //user exists, compare passwords
            const passwordCompare = await bcrypt.compare(password, user.password);
            //compare passwords returns false
            if (!passwordCompare) {
                return res.status(400).json({ error: "Please try to login with correct credentials!" })
            } else {
                //compare passwords returns true
                //return authtoken for the existing user
                const data = {
                    user: {
                        id: user.id
                    }
                }
                var authtoken = jwt.sign(data, JWT_SECRET);
                res.json({ authtoken });
            }
        }
        else {
            //incase errors occur
            return res.status(400).json({ errors: result.array() });
        }
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");
    }
});
//ROUTE#2: Create a user using POST "api/auth/login". ENDS HERE

//ROUTE#3: Create a user using POST "api/auth/getuser". login required. STARTS HERE
router.post('/getuser', fetchuser, async (req, res) => {
    try {
        const userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        res.json(user);

    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server error");

    }
});
//ROUTE#3: Create a user using POST "api/auth/login". ENDS HERE



module.exports = router;