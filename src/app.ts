import express from "express"
import morgan from "morgan"
import cors from "cors"
const fileUpload = require('express-fileupload')
import userRouter from "./routes/User.Routes";
import routerAuth from "./routes/Auth.Routes";
import cuposRouter from "./routes/Cupos.Routes";
import accesoRouter from "./routes/Acceso.Routes";
import configsRouter from "./routes/Configs.Routes";


const app = express()

app.use(morgan('dev'))
app.use(cors({
    origin: "http://localhost:5173", 
    credentials: true
}))
app.use(express.json())
app.use(fileUpload())

// Routes   
app.use(userRouter, routerAuth, accesoRouter, configsRouter, cuposRouter)

export default app; 