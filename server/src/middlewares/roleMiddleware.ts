import { Request, Response, NextFunction } from 'express'
import { IAuthRequest } from '../interfaces/authRequest'

export const roleMiddlware = async (req: Request, res: Response, next: NextFunction) => {
    console.log("ENTRÓ AL ROLE MIDDLEWARE")
    
    const authReq = req as IAuthRequest

    console.log(authReq.user)

    //no hay usuario loggeado
    if (!authReq.user) {
      res.status(401).json({ title: 'Acceso no autorizado', error: 'Error de auntenticación' })
      return
    }

    if(!authReq.user.isAdmin){
        res.status(403).json({ title: 'Acceso no autorizado', error: 'No tienes permisos para realizar esta acción' })
        return
    }

    next()
}