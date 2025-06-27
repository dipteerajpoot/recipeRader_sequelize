import { where } from "sequelize";
import User from "../Model/User.model.js";
import Recipe from "../Model/Racipe.model.js";

//this for saving the racipes in bulk
export const setRecipes = async (request, response, next) => {
    try {
        let recipeList = request.body;
        let userId = request.user.userId;
        for (let recipe of recipeList) {
            await Recipe.create({ ...recipe, userId: userId });
        }
        return response.status(201).json({ message: "Racipes added successfully" })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internel server error" })
    }
}
//this for saving one the racipes.
export const setRecipe = async (request, response, next) => {
    try {
        let recipe = request.body;
        let userId = request.user.userId;
        console.log(userId);
        let result = await Recipe.create({ ...recipe, userId: userId })
        if (result)
            return response.status(201).json({ message: "Racipes added successfully" });

        return response.status(400).json({ message: "Bad request" }, err)
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internel server error" })
    }
}
export const showAllRecipe = async (request, response, next) => {
    try {
        await Recipe.findAll()
            .then((result) => {
                return response.status(200).json({ racipes: result });
            })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internel server error" })
    }
}

export const findById = async (request, response, next) => {
    try {
        let { id } = request.params;
        await Recipe.findByPk(id)
            .then((result) => {
                return response.status(200).json({ racipes: result });
            })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internel server error" })
    }
}

export const findByCategory = async (request, response, next) => {
    try {
        const { category } = request.body;
        if (!category) {
            return response.status(400).json({ error: "Bad request" });
        }
        await Recipe.findAll({ where: { category: category } })
            .then((result) => {
                return response.status(200).json({ racipes: result });
            })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internel server error" })
    }
}

export const findByUser = async (request, response, next) => {
    try {
        const userId = request.user.userId;
        if (!userId) {
            return response.status(400).json({ error: "Bad request" });
        }
        await Recipe.findAll({ where: { userId: userId } })
            .then((result) => {
                return response.status(200).json({ racipes: result });
            })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internel server error" })
    }
}

export const deleteById = async (request, response, next) => {
    try {
        let { id } = request.params;
        await Recipe.destroy({ where: { id } })
            .then((result) => {
                return response.status(200).json({ message: "Recipe deleted" })
            })
            .catch((err) => {
                console.log(err);
                return response.status(404).json({ message: "Recipe not found" });
            })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internel server error" })
    }
}

export const deleteAll = async (request, response, next) => {
    try {
        let userId = request.user.userId;
        await Recipe.destroy({ where: { userId } })
            .then((result) => {
                return response.status(200).json({ message: "Recipes deleted" });
            })
            .catch((err) => {
                console.log(err);
                return response.status(404).json({ message: "Recipe not found" });
            })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internel server error" })
    }
}


export const updateById = async (request, response, next) => {
    try {
        let recipe = request.body;
        let {id}  =request.params;
        await Recipe.update(recipe,{ where: {id} })
            .then((result) => {
                return response.status(200).json({ message: "Recipe updated" })
            })
            .catch((err) => {   
                console.log(err);
                return response.status(404).json({ message: "Recipe not found" });
            })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internel server error" })
    }
}

export const updateAllCateg = async (request, response, next) => {
    try {
        let userId = request.user.userId;
        let {category} = request.body;
        await Recipe.update({category},{ where: { userId } })
            .then((result) => {
                return response.status(200).json({ message: "Recipes Update" });
            })
            .catch((err) => {
                console.log(err);
                return response.status(404).json({ message: "Recipe not found" });
            })
    }
    catch (err) {
        console.log(err);
        return response.status(500).json({ err: "Internel server error" })
    }
}

