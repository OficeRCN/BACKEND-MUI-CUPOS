import { Router } from "express";
import { CuposController } from "../controller/CuposController";

const cc = new CuposController(); 

const cuposRouter = Router(); 

cuposRouter.get("/allcupos", cc.getAll)
cuposRouter.get("/countcupos", cc.getCount)
cuposRouter.get("/imagen/:imagenRecibida", cc.sendImage)
cuposRouter.post("/cupos", cc.saveCupo)
cuposRouter.put("/cupos", cc.updateCupo)
cuposRouter.delete('/cupos/:cedula/:imageName/:correo/:nombres',cc.removeCupo);

export default cuposRouter; 