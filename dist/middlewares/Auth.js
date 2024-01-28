"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAuth = exports.adminAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtSecret = process.env.APP_SECRET;
const adminAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    if (!token) {
        // Handle the case when the token is not present
        return res.status(401).json({ error: "Unauthorized" });
    }
    if (token) {
        jsonwebtoken_1.default.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res === null || res === void 0 ? void 0 : res.status(401).json({ message: "Not authorized" });
            }
            else {
                if (decodedToken.userType !== "admin") {
                    return res
                        .status(401)
                        .json({ message: "Not authorized", user: decodedToken });
                }
                else {
                    next();
                }
            }
        });
    }
    else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" });
    }
};
exports.adminAuth = adminAuth;
const userAuth = (req, res, next) => {
    const token = req.cookies.jwt;
    console.log(req);
    if (!token) {
        // Handle the case when the token is not present
        return res.status(401).json({ error: "Unauthorized" });
    }
    if (token) {
        jsonwebtoken_1.default.verify(token, jwtSecret, (err, decodedToken) => {
            if (err) {
                return res.status(401).json({ message: "Not authorized" });
            }
            // if (decodedToken.userType !== "user") {
            //   return res.status(401).json({ message: "Not authorized" });
            // }
            next();
        });
    }
    else {
        return res
            .status(401)
            .json({ message: "Not authorized, token not available" });
    }
};
exports.userAuth = userAuth;
