import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'

export default class AuthController {
    public async register({request, auth}:HttpContextContract){
        const name = request.input('name');
        const email = request.input('email');
        const password =  request.input('password');

        const user = new User();
        user.name = name;
        user.email = email;
        user.password = password;
        await user.save()

        const token = await auth.use("api").login(user,{
            expiresIn:"30 mins"
        })
        return {
            token,
            "msg": "usuario registrado correctamente"
        }
    }

    public async login({auth,request,response}:HttpContextContract){
        const email = request.input('email')
        const password = request.input('password')
        try{
            const token = await auth.use("api").attempt(email,password,{
                expiresIn:"2 mins"
            });
            return {
                token,
                "msg": "Usuario logueado correctamente"
            }
        } catch (error){
            return response.unauthorized('Invalid credentials')
        }
    }

}
