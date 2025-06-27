import { DataTypes } from "sequelize";
import sequelize from "../Database/dbConfig.js";

const Favourite = sequelize.define("favourite", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true
    }
})

sequelize.sync()
    .then(() => {
        console.log("favourite has creted");

    })
    .catch((err) => {
        console.log("Failed ! favourite model is not created : ", err);
    })

export default Favourite;