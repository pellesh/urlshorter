import express from 'express';
import { initLinkController } from '../controllers/linksController.js';
import { initStatController } from '../controllers/statisticController.js';


export const initRedirectRouter = () => {

    const linkController = initLinkController();
    const statController = initStatController();

    const router = express.Router();

    router.get('/:subpart', async (req, res) => {
        const session = req.cookies.session;
        const subpart = req.params.subpart;
        //ищем ссылку по subpart
        const result = await linkController.getFullLinkBySubpart(subpart);
        if (result._status) {
            res.redirect(result._data);
            //обновляем счетчик использования ссылок пользователем
            await statController.updateUserStat(session);
        } else {
            //ссылка не найдена отправляем сообщение с ошибкой
            res.send(result.toJson());
        }
    });


    return router;
}
