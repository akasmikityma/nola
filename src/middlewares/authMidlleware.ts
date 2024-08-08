//authmiddleware is supposed to be placed where the user is trying to access the core data ..like in this case the recipes are the data that
//created to deleted by the users only so for that the user must be authenticated >>

import { NextFunction } from "express";
import { Request,Response } from "express";
import jwt from 'jsonwebtoken'
//req.headers would be having the token 
export const authmiddleware=async(req:Request,res:Response,next:NextFunction)=>{
    try{
        // const authheader =req.headers['authorization'];
        // const token = authheader && authheader.split(' ')[1];
        const token=req.cookies.token;
        console.log('token in the headers',token)
        if(!token){
            return res.status(401).send({
                msg:`you are not authorized to request this..first register/SignUp`
            });
        }
        //@ts-ignore
        jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
            if (err) {
              return res.sendStatus(403); // Forbidden if token is invalid
            }
        
            // Attach user info to the request object
            //@ts-ignore
            req.user = user;
            console.log(user)
            next(); // Pass control to the next middleware or route handler
          });
    }catch(err){

    }
}