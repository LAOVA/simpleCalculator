import express, { Express, Request, Response, Router } from 'express';
const cors = require('cors');

const app: Express = express();

const router: Router = express.Router();

app.use(cors());

app.use('/api', router);

router.get('/run', async (req: Request, res: Response): Promise<void> => {
    let data: string = req.query.data as string;
    let result: string = '';

    try {
        result = new Function('return ' + data)();
    } catch (error) {
        console.error(error);
        res.status(500).send('Error evaluating expression');
        return;
    }

    res.send({
        data: result
    });
});

app.listen(3000, (): void => {
    console.log('success server http://localhost:3000');
});