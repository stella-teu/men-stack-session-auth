import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import morgan from "morgan";
import methodOverride from "method-override";
import router from "./controllers/auth.js";

const app = express();
const port = process.env.PORT ? process.env.PORT : "3000";
mongoose.connect(process.env.MONGODB_URI);
// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

app.get("/", (req, res) => {
    res.render("index.ejs");
})
app.use("/", router);

mongoose.connection.on("connected", ()=> {
    console.log("Connected to MongoDB");
    app.listen(port, ()=> {
        console.log("Listening on port " + port);
    });
})