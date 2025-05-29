import {signUp, login, logout} from "../controllers/authenticationController.js"

const authenticationRouter = (app) => {
    app.post("/api/auth/signup", signUp);
    app.post("/api/auth/login", login);
    app.post("/api/auth/logout", logout);
}

export default authenticationRouter;