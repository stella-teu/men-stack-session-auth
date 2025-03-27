import { Router } from "express";
const userRouter = Router();
import User from "../models/user.js";
import bcrypt from "bcrypt";
import isSignedIn from "../middleware/is-signed-in.js";


//routes
userRouter.get("/", (req,res) => {
    res.render("index.ejs");
});

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

    req.session.user = {
        username: user.username,
    };
    req.session.save(() => {
        res.redirect("/");
    })    
})

userRouter.get("/sign-in", (req, res) => {
    res.render("auth/sign-in.ejs");
})

userRouter.post("/sign-in", async (req, res) => {
    const userInDatabase = await User.findOne({ username: req.body.username});
    if (!userInDatabase){
        return res.send("Login failed. Please try again.");
    }

    const validPassword = bcrypt.compareSync(req.body.password, userInDatabase.password)
    if (!validPassword) {
        return res.send("Login failed. Please try agin.");
    }
    console.log("Valid password")

    req.session.user = {
        _id: userInDatabase._id,
        username: userInDatabase.username
    }

    req.session.save(() => {
        res.redirect("/");
    })
})

userRouter.get("/sign-out", async (req, res) => {
    req.session.destroy(() => {
        res.redirect("/");
    });
})

userRouter.get("/vip", isSignedIn, (req,res) => {
    res.render("auth/vip-lounge.ejs")
})

export default userRouter;

