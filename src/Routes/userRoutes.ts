import express from 'express'
import { userSignIn_handler, userSignUP_handler } from '../Controllers/userControllers';
const user_router=express.Router();

user_router.post('/signUp',userSignUP_handler);
user_router.post('/signIn',userSignIn_handler);

export default user_router;