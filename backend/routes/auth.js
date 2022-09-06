const express = require('express')
const router = express.Router();
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchUser = require('../middleware/fetchUser')
const JWT_SECRET = 'hdaidhadiadhaidahdihdia'

// Create a user using: POST. 
// Does not require auth
router.post('/createuser', [
    body('name', 'name must be 3 characters long.').isLength({min:3}),
    body('email', 'enter a valid email').isEmail(),
    body('password', 'password must be 5 characters long.').isLength({min:5}),
], async (req, res) => {
    let errors = validationResult(req)
    // if errors, return bad req + errors
    let success = false
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    try{    
        // check if user with same email exists already
        let user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(400).json({success, error: 'sorry. a user with this email already exists.'})
        }
        
        const salt = await bcrypt.genSalt(10);    
        let secPass = await bcrypt.hash(req.body.password, salt)
        user =  await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })
        
        let data = {
            user: {
                id: user.id     // using id as it is indexed and info retrival is fast through it
            }
        }
        let authToken = jwt.sign(data, JWT_SECRET)
        success = true 
        res.json({success, authToken})  

    }catch(error){
        console.error(error.message)
        res.status(500).send('internal server error')
    }
    
    // .then(user => res.json(user))
    // .catch(err=>
    //     {
    //         console.log(err)
    //         res.json({error: 'please enter a unique value for email'})
    //     });

    // below line is not required as res.json() in above line will take care of it
    // res.send("kok")
})


// login end point of the user, no login required
router.post('/login', [
    body('email', 'enter a valid email').isEmail(),
    body('password', 'Password can not be blank').exists(),
], async (req, res) => {
    let success = false
    const errors = validationResult(req)
    // if errors, return bad req + errors
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }

    const {email, password} = req.body

    try{
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({success, error: 'sorry, invalid credentials'})
        }
        const passwordCompare = await bcrypt.compare(password, user.password)
        if(!passwordCompare){
            return res.status(400).json({success, error: 'sorry, invalid credentials'})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data, JWT_SECRET)
        success = true
        res.json({success, authToken})

    }catch(error){
        console.error(error.message)
        res.status(500).send('internal server error')
    }

})


// Route 3: Get logged in user's details
router.post('/getuser', fetchUser, async (req, res) => {
    try{
        const userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send(user)
    }catch(error){
        console.error(error.message)
        res.status(500).send('internal server error')
    }
})

module.exports = router