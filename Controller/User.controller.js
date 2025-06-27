import User from "../Model/User.model.js";
import { validationResult } from "express-validator";
import bcrypt from "bcryptjs";
import sequelize from "../Database/dbConfig.js";
import jwt from "jsonwebtoken";


export const signUp = async (request, response, next) => {
    const t = await sequelize.transaction();
    try {
        let velidaterr = validationResult(request);
        if (!velidaterr.isEmpty()) {
            return response.status(400).json({ error: "BadRequst || Invalid DAta", errorMassage: velidaterr.array() })
        }
        let { name, email, password } = request.body;
        let saltKey = bcrypt.genSaltSync(12);
        password = bcrypt.hashSync(password, saltKey)
        let user = await User.create({name, email, password }, { transaction: t });
        await t.commit();
        return response.status(201).json({ message: "signUp successfull", user })
    }
    catch (err) {
        await t.rollback();
        console.log(err);
        return response.status(500).json({ Error: "Internal server Error" });
    }
}



export const logIn = async (request, response, next) => {
    try {
        let {email,password} = request.body;
        let user = await User.findOne({where:{email},row:true});
        if(user){
        let ismatch = await bcrypt.compare(password,user.password);
        
        if(ismatch){
            response.cookie("token",genrateToken(user.id,user.email));
             response.status(200).json({message:"login successfull"})
        }
        response.status(401).json({error:"Invalid password | unauthorized user"})

    }
        return response.status(401).json({error:"Unauthorized user | Invalid user"});
    } 
    catch (error) {
        console.log(error);
        return response.status(500).json({ Error: "Internal server Error" });

    }
}

export const logOut = async (request, response, next) => {
    try {
        response.clearCookie("token");
        return response.status(200).json({ message: "LogOut Successfully"})
    }
    catch (err) {
        console.log("LogoutTime Error = ", err);
        return response.status(500).json({ message: "LogOut Failed | Internal Server Error" });
    }

}

const genrateToken= (userId,userEmail)=>{
    let payload = {userId : userId,emailId:userEmail};
    let token = jwt.sign(payload,process.env.SECRET_KEY);
    console.log(token);
    return token;
}