import { Router } from "express";
import { ConfiguracionesController } from "../controller/ConfiguracionesController";

const cc = new ConfiguracionesController(); 

const configsRouter = Router(); 

configsRouter.get("/allconfigs", cc.getAllConfigs)
configsRouter.get("/getmaxcupos", cc.getMaxCupo)
configsRouter.get("/getmaxlinks", cc.getMaxLink)
configsRouter.get("/configs/:id", cc.getConfigById)
configsRouter.post("/configs", cc.saveConfig)
configsRouter.put("/configs", cc.updateConfig)
configsRouter.delete("/configs/:id", cc.deleteConfig)

export default configsRouter; 