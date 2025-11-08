import { Request, Response, NextFunction } from 'express';
import guitars from '../example-guitars';

export const validateGuitarId = (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(guitars.findIndex((t) => t.id === +req.params.id))
    .then((index) => {
      if (index === -1) {
        res.status(400).json({ message: 'Guitar not found' });
        return Promise.reject('Guitar not found');
      } else {
        // @ts-ignore
        req.guitarIndex = index;
        next();
      }
    })
    .catch(next);
};
