import { Request,Response } from "express"
export const CreateRecipe=async(req:Request,res:Response)=>{
    try{
        const {name,method,Ingredients}=req.body;

        const newRecipe=await prisma?.recipe.create({
            data:{
                //@ts-ignore
                name,method,Ingredients,userID:req.user.userId
            }
        })
       if(newRecipe){
        return res.status(201).json({
            //@ts-ignore
            msg:`${req.user.userId}`,
            recipe:newRecipe
        })
       }else{
        return res.status(400).send({
            msg:`there is some error`
        })
       }
    }catch(err){
        console.log(err)
    }
}

export const DeleteRecipe=async(req:Request,res:Response)=>{
    try{
        const recipeID=req.query.id;
        //check if there is any recipe with that id and then check if the userID is the userID that the recipe has >>
        const foundandDelete=await prisma?.recipe.delete({
            where:{
            
                id:Number(recipeID),
                //@ts-ignore
                userID:req.user.userId
            }
        })
        if(foundandDelete){
            return res.status(201).send({
                msg:`recipe with ${recipeID} is successfully deleted`
            })
        }else{
            return res.status(400).send({
                msg:`there is some issues`
            })
        }
    }catch(err){
        console.log(err)
    }
}

export const PatchRecipe=async(req:Request,res:Response)=>{
    try{
        //i have userID from the middleware , id from the request query and just update
        const {id}=req.query; 
        //@ts-ignore
        const userid=req.user.userId;
        const updates=req.body;
        console.log(`in the controller id:`,id);
        console.log(`in the controller userid:`,userid);
        console.log(`in the controller updates:`,updates);
        const updatedRecipe=await prisma?.recipe.update({
            where:{
                id:Number(id),
                userID:userid
            },
            data:updates
        })
        if(updatedRecipe){
            return res.status(200).send({
                msg:`recipe with ${id} is successfully updated`,
                recipe:updatedRecipe
            })
        }else{
            return res.status(400).send({
                msg:`unable to update the recipe `
            })
        }
    }catch(err){
        console.log(err)
    }
}
export const getRecipe_handler=async(req:Request,res:Response)=>{
    try{
        const page=Number(req.query.page)||1;
        const limit =Number(req.query.limit)||5;
        const skip=(page-1)*limit;

        const recipes=await prisma?.recipe.findMany({
            skip,
            take:limit
        })
        if(recipes){
            return res.status(200).send({
                msg:`data fetched`,
                recipes:recipes
            })
        }
    }catch(err){
        console.log(err)
    }
}