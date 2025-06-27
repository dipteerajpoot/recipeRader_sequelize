import dotenv from "dotenv"
dotenv.config();
import jwt from "jsonwebtoken";
export const auth = async(request, response, next) => {
    try {
        let { token } = request.cookies;
        if (!token)
            throw new Error("unauthorized user  | token not found")
            let decode =jwt.verify(token,process.env.SECRET_KEY);
            request.user=decode;
            console.log(decode.userId,decode.emil);
            next();
    }
    catch (err) {
        return response.status(401).json({ error: "Unauthorized user | Invalid token" });
    }
}