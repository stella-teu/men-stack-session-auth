import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import methodOverride from "method-override";
import router from "./controllers/auth.js";
import session from "express-session";
import MongoStore from "connect-mongo";
import passUserToView from "./middleware/pass-user-to-view.js";

const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";
mongoose.connect(process.env.MONGODB_URI);
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: true,
        store: MongoStore.create({
            mongoUrl: process.env.MONGODB_URI,
        })
    })
);

app.use(passUserToView);

app.use("/", router);

mongoose.connection.on("connected", ()=> {
    console.log("Connected to MongoDB");
    app.listen(port, ()=> {
        console.log("Listening on port " + port);
    });
})