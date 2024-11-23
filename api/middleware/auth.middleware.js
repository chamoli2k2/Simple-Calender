import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import dotenv from 'dotenv';

// Config dotenv
dotenv.config();

const protect = async (req, res, next) => {
    try{
        let token;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if(!token) {
            return res.status(401).json({ error: "Not authorized to access this route" });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decoded.id);

        if(!user) {
            return res.status(404).json({ error: "No user found with this id" });
        }

        req.user = user;
        next();
    }
    catch(error) {
        res.status(401).json({ error: "Not authorized to access this route" });
    }
};

export { protect };