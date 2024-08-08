import { Request, Response } from 'express';
import prisma from '../prisma';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RegisteruserbodyZOD ,LoginUserbodyZOD} from '../zodSchemas/allZods';
export const userSignUP_handler = async (req: Request, res: Response) => {
  try {
    const userbody = req.body;
    const parseResult = RegisteruserbodyZOD.safeParse(userbody);

    if (!parseResult.success) {
      return res.status(400).send({
        msg: 'Missing the required fields or the type of the value is incorrect',
        errors: parseResult.error.errors
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email:userbody.email },
    });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(userbody.password, 10);

    // Create new user
    const newUser = await prisma.user.create({
      data: {
        name:userbody.name,
        email:userbody.email,
        password: hashedPassword,
      },
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    res.cookie('token',token,{httpOnly:true,maxAge: 900000 })
    res.status(201).send({
      msg: 'A new user is created',
      user: newUser,
      token:token
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      msg: 'Internal server error',
    });
  }
};

export const userSignIn_handler=async(req:Request,res:Response)=>{
    try{
        const {email,password}=req.body;
        //check if there any user with the email provided and then if the password is correct >?
        const parsedBody=LoginUserbodyZOD.safeParse({email,password});
        if(!parsedBody.success){
          return res.status(400).send({
            msg:`the required fields are not filled  with right type of values `
          })
        }
        const found =await prisma.user.findUnique({
            where:{
                email:email
            }
        })
        if(!found){
            return res.status(404).send({
                msg:`there is no user with this email ..try Signing UP`
            })
        }
        const isSame=await bcrypt.compare(password,found?.password)
        if(isSame){
            const token = jwt.sign({ userId: found.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
            res.cookie('token',token,{httpOnly:true,maxAge: 900000 })
            return res.status(200).send({
                msg:`Welcome Back ${found.name}`,
                token:token
            })
        }else{
            return res.status(400).send({
                msg:`Invalid Password`
            })
        }
        
    }catch(err){
        console.log(err)
    }
}