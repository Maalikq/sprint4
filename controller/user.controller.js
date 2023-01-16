
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const { UserModel } = require('../model/user.model');

require("dotenv").config()

const createUser = async(req, res) => {
    const { name, email, gender, password } = req.body;
    try {
        const presentuser = await UserModel.findOne({ email })
        if (presentuser) {
            res.send("You already registered please login")
        } else {
            bcrypt.hash(password, 7, async (err, secure_password) => {
                if (err) {
                    console.log(err)
                } else {
                    const newUser = await UserModel({ name, email,gender, password: secure_password })
                    await newUser.save()
                    res.send("user registered successfully")
                }
            })
        }
    } catch (err) {
        console.log(err)
        res.send("Registration failed")
    }
}

const loginUser = async (req, res) => { 
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email })
        const hashed_pass = user.password
        const ID = user._id;
        if (user) {
            bcrypt.compare(password, hashed_pass,(err, result)=> {
                if (err) {
                    console.log(err)
                    res.send({"err":err})
                } else if (result) {
                    const token = jwt.sign({ userID: ID }, process.env.KEY)
                    res.send({"message":"user login successful with","token":token})
                } else {
                    res.send("wrong credentials")
                }
            })
        } else {
            res.send("wrong credentials last")
        }
    } catch (err) {
        console.log(err)
        res.send("login failed")
    }
}

module.exports ={createUser,loginUser}