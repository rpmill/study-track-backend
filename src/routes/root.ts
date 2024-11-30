import { Request, Response, Router } from 'express';
import path from 'path';

export const baseRouter = Router();

baseRouter.get('^/$|/index(.html)?', (req: Request, res: Response) => {
    res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

