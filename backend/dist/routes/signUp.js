"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const router = (0, express_1.Router)();
const SignUp = router.post("/", (req, res) => {
    const { username, email, password, firstName, lastName } = req.body;
    (0, userController_1.createNewUser)(req.body);
    res.send("User Created Successfully");
});
exports.default = SignUp;
