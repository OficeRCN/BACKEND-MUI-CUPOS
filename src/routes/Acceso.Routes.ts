import { Router } from "express";

import { AccesosController } from "../controller/AccesosController";

const ac = new AccesosController(); 

const accesoRouter = Router();

accesoRouter.get("/allAccesos", ac.getAccesos)
accesoRouter.get("/countAccesos", ac.getCountAccesos)
accesoRouter.get("/getone/:id", ac.getOneById)
accesoRouter.post("/accesos", ac.createAcceso)
accesoRouter.put("/accesos", ac.updateAcceso)
accesoRouter.delete("/accesos/:id", ac.deleteAcceso)

export default accesoRouter; 