import {Request, Response, NextFunction} from "express"
import { UserController } from "../controller/UserController"
import { Auth } from "../controller/AuthController"
import * as jwt from "jsonwebtoken"

export class AuthRequired{
    requireAuth(req: Request, res: Response, next: NextFunction){
        const authHeader = req.headers.authorization; 
        if(!authHeader) return res.status(401).json({msg: "Unauthorize"})
        
        const token = authHeader.split(' ')[1]

        if(!token) return res.status(401).json({msg: "Unauthorize"})

        jwt.verify(token, 'Cl@veSecret@-', (err, user)=>{
            if(err) return res.status(401).json({msg: "Unauthorize"})
            req.user = user
        })
        next()
    }
}