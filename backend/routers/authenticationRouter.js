import {signUp} from "../controllers/authenticationController.js"

const authenticationRouter = (app) => {
    app.post("/api/auth/signup", signUp);
}

export default authenticationRouter;