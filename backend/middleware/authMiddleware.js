import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";

// This middle is used to protect accessing without authentication
const protect = asyncHandler(async (req, res, next) => {
    let token;

    token = req.cookies.jwt;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // User.findById(decoded.userId) - get id from generateToken.js
            req.user = await User.findById(decoded.userId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Invalid token");
        }
    } else {
        res.status(401);
        throw new Error("Unauthorized, no token used");
    }
});

export { protect };
