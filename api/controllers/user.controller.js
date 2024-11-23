import User from "../models/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../utils/generateToken.js";


// Register a new user
const register = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Check if the user already exists
        const userExist = await User.findOne({ email, username });

        // If user already exists
        if(userExist) {
            return res.status(400).json({ error: "User already exists" });
        }

        // Create a new user
        const user = await User.create({ username, email, password });

        // Send the user details
        res.status(201).json({ user });
    }
    catch(error) {
        res.status(500).json({ error: error.message });
    }

};


// Login a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if the user exists
        const user = await User.findOne({ email });

        if(!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // Check if the password is correct
        const isMatch = await user.matchPassword(password);

        if(!isMatch) {
            return res.status(400).json({ error: "Invalid password" });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        // Saving the refresh token in the database
        user.refreshToken = refreshToken;
        await user.save();

        // Send the user details
        res.status(200).json({ user, accessToken, refreshToken });

    }   
    catch(error) {
        res.status(500).json({ error: error.message });
    }

};

const logout = async (req, res) => {
    try {
        const { refreshToken } = req.body;

        // Delete the refresh token from the database
        const user = await User.findOne({ refreshToken });

        // If the user does not exist
        if(!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Delete the refresh token
        user.refreshToken = "";
        await user.save();

        res.status(200).json({ message: "Logged out successfully" });
    }
    catch(err){
        // Handle specific verification errors
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Refresh token has expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid refresh token' });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
}


const refreshAccessToken = async (req, res) => {
    const { refreshToken } = req.body;

    if (!refreshToken) return res.status(401).json({ message: 'Refresh token is missing' });

    try {
        // Verify the token using the same secret used to sign it
        const user = await User.findOne({ refreshToken });

        if(!user) {
            return res.status(403).json({ message: 'Invalid refresh token' });
        }
        
        // If valid, issue new access token
        const accessToken = generateAccessToken(user._id);
    
        return res.status(200).json({ accessToken });

    } catch (err) {
        // Handle specific verification errors
        if (err.name === 'TokenExpiredError') {
            return res.status(403).json({ message: 'Refresh token has expired' });
        } else if (err.name === 'JsonWebTokenError') {
            return res.status(403).json({ message: 'Invalid refresh token' });
        } else {
            return res.status(500).json({ message: 'Internal server error' });
        }
    }
};

export { register, login, logout, refreshAccessToken };