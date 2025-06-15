const { signUpSchema, signInSchema } = require("../middlewares/auth-validator.middleware");
const { doHash, doHashValidation } = require("../utils/hashing.utils");
const { generateAccessToken } = require("../middlewares/jwt-token.middleware");
const users = require("../models/user.model");

const signUp = async (req, res) => {
    const { username, email, password } = req.body;

    const { error } = signUpSchema.validate({ username, email, password });

    if (error) {
        return res.status(401).json({
            status: false,
            message: error.details[0].message,
        });
    }

    try {
        
        const emailExist = await users.findOne({ email });

        if (emailExist) {
            return res.status(200).json({
                status: true,
                message: "Email already registered",
            });
        }

        const hashedPassword = await doHash(password, 10);

        const newUser = new users ({
            id: users.length + 1,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        return res.status(201).json({
            status: true,
            message: "Account has been created!",
        });

    } catch (err) {
        console.error("Signup error:", err);

        if (err.code === 11000) {
            return res.status(409).json({
                status: false,
                message: "A user with this email or username already exists.",
            });
        };

        return res.status(500).json({
            status: false,
            message: "An unexpected error occured."
        })
    }
};

const getUsers = (req, res) => {
    res.json(users);
};

const signIn = async (req, res) => {
    const { email, password } = req.body;
    
    const { error } = signInSchema.validate({ email, password });

    if (error) {
        return res.status(401).json({
            status: false,
            message: error.details[0].message,
        });
    }

    const userExist = await users.findOne( {email} );

    if (userExist) {
        const matchPassword = await doHashValidation(password, userExist.password);

        if (matchPassword) {
            const token = generateAccessToken(userExist.email);
            return res.status(200).json({
                status: true,
                token: token,
                message: "Welcome, you are logged in!",
            });
        }  
        
        res.status(401).json({
            status: false,
            message: "Invalid password",
        });
    }    

    res.status(401).json({
        status: false,
        message: "Invalid credentials",
    });
};

module.exports = { 
    signIn,
    signUp,
    getUsers,
};