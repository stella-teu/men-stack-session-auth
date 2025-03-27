import { Router } from "express";
const userRouter = Router();
import User from "../models/user.js";
import bcrypt from "bcrypt";

//routes
userRouter.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
})

userRouter.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
})

userRouter.post("/sign-up", async (req, res) => {
    if (req.body.password !== req.body.confirmPassword){
        return res.send("Password and Confirm Password do not match.")
    }

    const userInDatabase = await User.findOne({ username: req.body.username});
    if (userInDatabase) {
        return res.send("Username already taken.")
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    const user = await User.create(req.body);
    res.send("Thanks for signing up " + user.username + ".");
})

userRouter.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
})

export default userRouter;

