import { Request, Response, NextFunction } from 'express';

interface ValidationError extends Error {
    name: 'ValidationError';
    errors: Record<string, { message: string }>;
}

interface CastError extends Error {
    name: 'CastError';
    value: string;
}

interface CustomError extends Error {
    statusCode?: number;
    error?: string
}
type ErrorWithStatus = ValidationError | CastError | CustomError;

export const errorHandler = (err: ErrorWithStatus, _req: Request, res: Response, _next: NextFunction) => {
    
    if (err.name === 'ValidationError') {
        const validationMessages = Object.values((err as ValidationError).errors).map(val => val.message);
        
        return res.status(400).json({
            message: "Error de validación",
            error: validationMessages.join(', ') 
        });
    }

    if (err.name === 'CastError') {
        return res.status(400).json({
            message: "Error en la solicitud",
            error: `El ID '${(err as CastError).value}' no tiene un formato válido.`
        });
    }

    if ((err as CustomError).statusCode) {
        return res.status((err as CustomError).statusCode!).json({
            message: err.message,
            ...((err as CustomError).error && { error: (err as CustomError).error })
        });
    }

    return res.status(500).json({
        message: "Error interno del servidor",
        error: err.message
    });
};