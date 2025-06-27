import {Sequelize} from "sequelize";
import dotenv from "dotenv";
dotenv.config();
let sequelize =new Sequelize (process.env.DB_NAME,process.env.DB_USER,process.env.DB_PASSWORD,{
    host :process.env.DB_HOST,
    dialect :process.env.DB_DIALECT
})
sequelize.authenticate()
.then(() =>{
    console.log("Databse connected")
})
.catch(err =>{
    console.log(err);
})

export default sequelize;
