import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import FavouriteRouter from "./Routers/favourite.route.js";
import UserRouter from "./Routers/User.route.js";
import RecipeRouter from "./Routers/Recipe.router.js";
import "./Model/association.js";

import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(cookieParser());

app.use("/user",UserRouter);
app.use("/recipe",RecipeRouter);
app.use("/favourite",FavouriteRouter);

app.listen(3000,()=>{
    console.log("server started ......")
});
