import { DataTypes } from "sequelize";
import sequelize from "../Database/dbConfig.js";
const Recipe = sequelize.define('recipe', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
    unique: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING(250),
    allowNull: false
  },
  ingredients: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  steps: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  imageUrl: {
    type: DataTypes.STRING(350),
    allowNull: true
  },
  category: {
    type: DataTypes.STRING(50),  
    allowNull: true             
   }
});
sequelize.sync()
  .then(() => {
    console.log("Recipe has creted");

  })
  .catch((err) => {
    console.log("Failed ! Recipe model is not created : ", err);
  })

export default Recipe;