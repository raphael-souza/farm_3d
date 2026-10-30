import { Request, Response, NextFunction } from "express";

export function errorHandler(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  console.error("**** MiddleWare Error Handler:", error.message);

  if (error instanceof Error) {
    res.status(400).json({
      error: error.message,
    });

    return;
  }

  console.error(error);

  res.status(500).json({
    error: "Erro interno do servidor",
  });
}