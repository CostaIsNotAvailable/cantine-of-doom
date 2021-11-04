import { Request, Response, NextFunction } from 'express';

const errorHandler = async (error: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500).send({ error: error.message });
};

export default errorHandler;
