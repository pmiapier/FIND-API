const createError = require("../utils/create-error");
const jwt = require("jsonwebtoken");
const prisma = require("../models/prisma");
require(`dotenv`).config();
const { JWT_SECRET_KEY } = process.env;

module.exports = async (req, res, next) => {
    try {
        const authorization = req.headers.authorization;
        if (!authorization || !authorization.startsWith("Bearer")) return next(createError("unauthenticated", 401));
        
        const [bearer,token] = authorization.split(` `)
        const payload = jwt.verify(token, JWT_SECRET_KEY);
        const user = await prisma.user.findUnique({
            where: {id: payload.userId,},
        });

        if (!user) return next(createError("unauthenticated", 401));
        
        delete user.password;

        req.user = user;
        next();
    } catch (err) {
        if (
            err.name === "TokenExpiredError" ||
            err.name === "JsonWebTokenError"
        ) {
            err.statusCode = 401;
        }
        next(err);
    }
};
