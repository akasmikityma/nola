import express from 'express'
import { CreateRecipe, getRecipe_handler } from '../Controllers/recipeControllers';
import { authmiddleware } from '../middlewares/authMidlleware';
import { PatchRecipe } from '../Controllers/recipeControllers';
import { DeleteRecipe } from '../Controllers/recipeControllers';
const recipeRouter=express.Router();
recipeRouter.get('/get',getRecipe_handler)
recipeRouter.post('/create',authmiddleware,CreateRecipe);
recipeRouter.delete('/delete',authmiddleware,DeleteRecipe)
recipeRouter.patch('/update',authmiddleware,PatchRecipe)
export default recipeRouter