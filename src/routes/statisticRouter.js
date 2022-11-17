import express from 'express';
import { initStatController } from '../controllers/statisticController.js';


export const initStatisticRouter = () => {

    const statController = initStatController();
    const router = express.Router();

    router.get('/statistic', async (req, res) => {
        const session = req.cookies.session;
        //возвращаем всю статистику
        const result = await statController.getStat(session);
        res.send(result.toJson());
    });


    return router;
}
