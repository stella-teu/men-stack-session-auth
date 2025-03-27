import { Router } from "express";
const userRouter = Router();

//routes
userRouter.get("/sign-up", (req, res) => {
    res.render("auth/sign-up.ejs");
})

userRouter.get("/sign-up", (req, res) => {
    res.render("auth/sign-up");
})

export default userRouter;

