import express from 'express';
import {initLinkController} from '../controllers/linksController.js';


export const initLinkRouter = () => {
    
    const linkController = initLinkController()
    const router = express.Router();

    // получение всех ссылок пользователя по сессии
    router.get('/link', async (req, res) => {
        const session = req.cookies.session;
        const result =  await linkController.getLinks(session);
        res.send(result.toJson());
    });
    
    //добавление новой ссылки
    router.post('/link', async (req, res) => {
        const session = req.cookies.session;
        const result = await linkController.createLink(session, req.body.link, req.body.subpart);
        res.send(result.toJson());
    });

    

    return router;
}
 