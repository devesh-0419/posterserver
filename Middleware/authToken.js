const jwt = require("jsonwebtoken");

const authToken = (payload,res)=>{


    const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "60m",
        });

       return res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development", // true on prod
            maxAge: 60 * 60 * 1000, // 60 minutes
            sameSite: 'None', // or 'Lax'/'Strict' as needed
            domain: 'localhost', // or your domain
            path: '/',
        });
}

module.exports = authToken;