import express from 'express';
import user_router from './Routes/userRoutes';
import recipeRouter from './Routes/recipeRouter';
import cookieParser from 'cookie-parser';
import { errorhandler } from './middlewares/errorMiddleware';
const app=express();
app.use(cookieParser())
app.use(express.json())
app.use('/',user_router);
app.use('/recipe',recipeRouter)
app.use(errorhandler)
app.listen(3000,()=>{
    console.log(`the server is running`);
})