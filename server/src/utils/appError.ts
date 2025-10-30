export class AppError extends Error {
  public statusCode: number;
  public error?: string;

  constructor(message: string, statusCode: number, errorDetails?: string) {
    super(message);
    this.statusCode = statusCode;
    this.error = errorDetails;
  }
}