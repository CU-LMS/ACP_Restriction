const jwt = require('jsonwebtoken')
const User = require('../models/User')

const register = async (req, res) => {
    const newUser = new User({
        email: req.body.email,
        password: req.body.password,
    })
    try {
        const savedUser = await newUser.save();
        const count = await User.countDocuments({})
        if (count == 1) {
            await User.findOneAndUpdate({ email: req.body.email }, {
                isAdmin: true,
            })
        }
        res.status(201).json({ msg: "user registered successfully" });
    } catch (error) {
        res.status(500).json(error);
    }
}

const login = async (req, res) => {
    try {
        //finding user with the provided username
        const user = await User.findOne({ email: req.body.email });

        //if user does not exist
        if (!user) {
            return res.status(401).json("Wrong credentials");
        }
        //calling instance method to comparehashed password
        const isMatch = await user.comparePassword(req.body.password);
        if (!isMatch) {
            return res.status(401).json("Wrong credentials");
        }
        //if every thing is okay then send the user details except password
        const accestoken = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
        const { password, ...others } = user._doc;
        res.status(201).json({ ...others, accestoken });
    } catch (error) {
        res.status(500).json(error.message);
        console.log(error)
    }
}

module.exports = {
    login,
    register
}
