import express from "express";
import {auth} from "../Middleware/auth.js";
import { addToFav,getToFavList,deleteToFavList } from "../Controller/favourite.controller.js";
const router = express.Router();
router.post("/addToFav",auth,addToFav);
router.get("/getFevList",auth,getToFavList);
router.delete("/deleteToFavList/:id",deleteToFavList);
export default router;