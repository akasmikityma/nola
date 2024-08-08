import { Request, Response, NextFunction } from 'express';
export const errorhandler=(err:any,req:Request,res:Response,next:NextFunction)=>{
    console.error(err.stack);
    if(res.headersSent){
        return next(err)
    }
    res.status(500).json({msg:`internal server error,{fromMiddleware}`})
}