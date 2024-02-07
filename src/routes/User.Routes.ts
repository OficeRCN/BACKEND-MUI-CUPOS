import { Router } from "express";
import { UserController } from "../controller/UserController";

const uc = new UserController();

const userRouter = Router();

userRouter.post("/users", uc.saveUser);
userRouter.get("/users", uc.getAllUsers)
userRouter.get("/usercount", uc.getCountUser)

export default userRouter;
