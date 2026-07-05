const client = require("../db");
const jwt = require("jsonwebtoken");    
const bcrypt = require("bcrypt");  



const getUsers = (req,res) => {
    res.send("Controller from user");
};

const getProfile = async (req, res) => {

    try {

        const result = await client.query(

            "SELECT id, email FROM users WHERE id = $1",

            [req.user.id]

        );

        res.status(200).json(result.rows[0]);

    }

    catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};

const registerUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const existingUser = await client.query(
            "SELECT * FROM users WHERE email = $1",
            [email]
        );

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const result = await client.query(
            "INSERT INTO users (email, password) VALUES ($1, $2) RETURNING *",
            [email, hashedPassword]
        );

        res.status(201).json({
            message: "Registration successful"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};
const loginUser = async (req, res) => {

    try {

        const { email, password } = req.body;

        const result = await client.query(

            "SELECT * FROM users WHERE email = $1",

            [email]

        );

        if (result.rows.length === 0) {

            return res.status(400).json({
                message: "User not found"
            });

        }

        const user = result.rows[0];

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {

            return res.status(400).json({
                message: "Invalid password"
            });

        }
        const token = jwt.sign(
    {
        id: user.id,
        email: user.email
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "1h"
    }
);

        res.status(200).json({
            message: "Login successful",
            token
        });

    }

    catch(error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    getUsers,
    registerUser,
    loginUser,
    getProfile
} 