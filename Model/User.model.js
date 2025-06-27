import sequelize from "../Database/dbConfig.js";
import {DataTypes} from "sequelize";
const User = sequelize.define("user",{
    id :{
        type : DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        unique:true,
 
    },
    name : {
        type :DataTypes.STRING(30),
        allowNull:false,
         validate :{
             isAlpha:true
        }
    },
    email : {
        type : DataTypes.STRING(40),
        allowNull : false,
        unique :true
    },  
    password:{
        type:DataTypes.STRING(100),
        allowNull:false,
        unique:true
    }

})
sequelize.sync()
.then(() =>{
    console.log("User Model Created...");

})
.catch(err => {
    console.log("Failed to create user model", err);
})

export default User;

