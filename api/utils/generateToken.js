import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

// config the dotenv
dotenv.config();

// Generate access token
const generateAccessToken = (id) => {
    const accessToken = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '1d',
    });

    return accessToken
};

// Generate refresh token
const generateRefreshToken = (id) => {
    const refreshToken = jwt.sign({ id }, process.env.REFRESH_TOKEN_SECRET, {
        expiresIn: '7d',
    });

    return refreshToken;
}


export { generateAccessToken, generateRefreshToken };