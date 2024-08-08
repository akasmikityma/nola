import z from 'zod';

export const RegisteruserbodyZOD=z.object({
    name:z.string(),
    email:z.string().email(),
    password:z.string()
})
export const LoginUserbodyZOD=z.object({
    email:z.string().email(),
    password:z.string()
})
export const recipebodyZOD=z.object({
    name:z.string(),
    method:z.string(),
    Ingredients:z.array(z.string())
})