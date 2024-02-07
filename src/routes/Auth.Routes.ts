import { Router } from "express";

import { Auth } from "../controller/AuthController";
import { AuthRequired } from "../middleware/RequireAuth";

const auth = new Auth(); 
const ar = new AuthRequired();

const routerAuth = Router(); 

routerAuth.post("/login", auth.loginHandler)
routerAuth.get("/user", ar.requireAuth, auth.userHandler)

export default routerAuth; 