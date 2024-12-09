import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectedRoute = async (req, res, next) => {
    try {
        const accessToken = req.cookies.accessToken;
        
        if (!accessToken) {
            return res.status(401).json({ message: "Token is missing" });
        } 

        try {
            const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user;

        next();
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            }
            throw error;
        }

    } catch (error) {
        console.log("Error in protectedRoute middleware", error.message);
        return res.status(401).json({ message: "Invalid token" });
    }
};

export const adminRoute = async (req, res, next) => {
    if(req.user.role && req.user.role === "admin") {
        next();
    } else {
        return res.status(403).json({ message: "Access denied" });
    }
};