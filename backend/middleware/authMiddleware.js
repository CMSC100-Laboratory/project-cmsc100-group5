import jwt, { decode } from 'jsonwebtoken';
import dotenv from 'dotenv'

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET
const verifyToken = (req, res, next) =>{
    const token = req.cookies.token;
    console.log(token);
    console.log(JWT_SECRET);

    if(!token){//no token
        return res.status(401).json({error: "Access Denied. No token provided"});
    }
    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        console.log(decoded);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(403).json({ error: 'Invalid or expired token.' });
    }
}

const authorizeRole = (...allowedRoles) => {
    return (req, res, next) => {
        if(!allowedRoles.includes(req.user.userType)){
            return res.status(401).json({error: "Access Denied"});
        }
        next();
    }
} 

export {verifyToken, authorizeRole}