"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserAccount = void 0;
const User_1 = require("../models/User");
const jwtSecret = process.env.APP_SECRET;
const createUserAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, password, passwordVerify } = req.body;
    try {
        if (!email || !password || !passwordVerify)
            return res.status(401).json({ error: "Email and Password are required" });
        if (password.length < 5)
            return res
                .status(401)
                .json({ error: "Password must be at least 5 characters" });
        if (password !== passwordVerify)
            return res.status(401).json({ error: "Passwords do not match" });
        const existingUser = yield User_1.User.findOne({ email });
        if (existingUser)
            return res
                .status(401)
                .json({ error: "An account with this email already exists" });
    }
    catch (err) {
        console.error(err);
        return res.status(500).send();
    }
});
exports.createUserAccount = createUserAccount;
