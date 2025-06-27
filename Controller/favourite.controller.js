import { where } from "sequelize";
import Recipe from "../Model/Racipe.model.js";
import User from "../Model/User.model.js";
import favourite from "../Model/favourite.model.js";
export const addToFav = async (request, response, next) => {
    try {
        let {userId} = request.user;
            console.log("userId" , userId)
        let {recipeId} = request.body;
        const user = await User.findOne({where:{id:userId}});
        if (!user)
            return response.status(400).json({ message: "recipe is allready added" });
            const recipe = await Recipe.findOne({where:{id:recipeId}});
        if(!recipe)
            return response.status(400).json({ message: "recipe is allready added" });

        const fav = await favourite.create({ userId, recipeId });
        response.status(201).json({ message: "Recipe added to favorites", fav});

    } catch (error) {
        console.log(error);
        return response.status(500).json("Internel server error");
    }
}

export const getToFavList = async (request, response, next) => {
    try {
        let {userId} = request.user;    
        const fevList = await favourite.findAll({where:{userId},include:[Recipe]});
        if(!fevList)
            return response.status(404).json({ message: "No favorites found for this user" });

        return response.status(200).json({ message: "Favorite recipes fetched successfully", favorites: fevList });

    } catch (error) {
        console.log(error);
        return response.status(500).json("Internel server error");
    }
}

export const deleteToFavList = async (request, response, next) => {
    try {
        let {id} = request.params;    
        const fevList = await favourite.destroy({where:{id}});
        if(!fevList)
            return response.status(404).json({ message: "not delte || unauthorized" });

        return response.status(200).json({ message: "racipe removed"});

    } catch (error) {
        console.log(error);
        return response.status(500).json("Internel server error");
    }
}