import {signUp, login, logout, getProfile} from "../controllers/authenticationController.js"
import {verifyToken} from "../middleware/authMiddleware.js"

const authenticationRouter = (app) => {
    app.post("/api/auth/signup", signUp);
    app.post("/api/auth/login", login);
    app.post("/api/auth/logout", logout);
    app.get("/api/auth/get-profile", verifyToken, getProfile);
}

export default authenticationRouter;