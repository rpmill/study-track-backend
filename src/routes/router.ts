import { Router, Request, Response } from 'express';

export const router = Router();

// teachers
router.route('/teachers')
    .get((req: Request, res: Response) => {
        res.status(200).send({ message: 'All good!' });
    })

router.route('/teachers/:teacherId')
    .get((req: Request, res: Response) => {
        res.status(200).send({ message: 'You made it here!' });
    })

// students

// classrooms

// lessonPlans

// lessons

// parentOrgs