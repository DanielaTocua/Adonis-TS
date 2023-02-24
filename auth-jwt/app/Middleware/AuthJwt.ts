import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UsuariosController from 'App/Controllers/Http/UsuariosController'
export default class AuthJwt {
  public async handle(ctx: HttpContextContract, next: () => Promise<void>) {
    // code for middleware goes here. ABOVE THE NEXT CALL
    const authorizationHeader = ctx.request.header('authorization')
    if (authorizationHeader == undefined){
      return ctx.response.status(401).send({
        msg: "Falta el token de autorización",
        status: 401
      })
    }
    const token = authorizationHeader

    try{
      const usuariosController = new UsuariosController()
      usuariosController.verificarToken(token)
      await next()
    } catch(error){
      ctx.response.status(400).send("Falla en el token")
    }
  }
}
