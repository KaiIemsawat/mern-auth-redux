import jwt from "jsonwebtoken";

const genToken = (res, userId) => {
    const expiresIn30Days = 30 * 24 * 60 * 60 * 1000;
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: expiresIn30Days,
    });

    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        sameSite: "strict",
        maxAge: expiresIn30Days,
    });
};

export default genToken;
