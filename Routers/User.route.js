import express from "express";
import { signUp ,logIn, logOut} from "../Controller/User.controller.js";
import {body } from "express-validator";
const router = express.Router();
router.post("/signUp",
    body("name","Name is requiered").notEmpty(),
    body("email","email required").notEmpty(),
    body("email","Not a valid email").isEmail(),
    body("password","password required").notEmpty(),
    body("password","password is not empty").isLength({min:6  ,max:10}),
    signUp
);
router.post("/logIn",logIn)
router.post("/logout",logOut)

export default router;