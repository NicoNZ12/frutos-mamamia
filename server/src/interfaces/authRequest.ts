import { Request } from 'express'

// Esto es lo que guarda el token del user loggeado

export interface IUserPayload {
  id: string
  email: string
  isAdmin: boolean
}

export interface IAuthRequest extends Request {
  user?: IUserPayload
}