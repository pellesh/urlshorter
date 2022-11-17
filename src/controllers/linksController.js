import { Result } from "../classes/Result.js";
import linkModel from "../models/linksModel.js"
import linkCacheModel from "../models/linkCacheModel.js";
import { generateString } from "../utils.js";
import { MESSAGES } from "../consts.js";
import { logger } from "../logging/log.js";
import { validateLink } from "../utils.js";

export const initLinkController = () => {

    return {
        
        /**
        * returns full link by subpart
        * @async
        * @function getFullLinkBySubpart
        * @param {string} subpart link subpart 
        * @return {Promise<Result>} returns full link by subpart at data property
        * */
        getFullLinkBySubpart: async (subpart) => {
            const result = new Result();
            try {
                //ищем сначала полную ссылку в кэше
                const cachedData = await linkCacheModel.getLinkBySubpart(subpart);
                if (!cachedData) {
                    //если не нашли в кеше идём в бд за полной ссылкой
                    const checkLink = await linkModel.getLinkBySubpart(subpart);
                    if (checkLink) {
                        result.setData(checkLink.link)
                        //если нашли то добавляем её в кэш
                        await linkCacheModel.addLink(checkLink.link, subpart);
                    } else {
                        result.setMessage(MESSAGES.LINK_NOT_EXISTS);
                        result.setStatus(false);
                    }
                } else {
                    result.setData(cachedData);
                }
            } catch (err) {
                logger.error(err.stack);
                result.setStatus(false);
                result.setCode(500);
                result.setMessage(MESSAGES.INTERNAL_SERVER_ERROR);
            }
            return result;
        },

        /**
        * returns all users links
        * @async
        * @function getLinks
        * @param {string} session users session
        * @return {Promise<Result>} returns full link by subpart at data property
        * */
        getLinks: async (session) => {
            const result = new Result();
            try {
                //получаем полный список ссылок пользователя
                const links = await linkModel.getUserLinks(session);
                result.setData(links);
            } catch (err) {
                logger.error(err.stack);
                result.setStatus(false);
                result.setCode(500);
                result.setMessage(MESSAGES.INTERNAL_SERVER_ERROR);
            }
            return result;
        },

        /**
        * create new association link - subpurt
        * @async
        * @function createLink
        * @param {string} session users session
        * @param {string} link  link
        * @param {string} subpart  subpart
        * @return {Promise<Result>} returns new association link - subpurt 
        * */
        createLink: async (session, link, subpart) => {
            const result = new Result();
            try {

                if(!link){
                    result.setStatus(false);
                    result.setMessage(MESSAGES.LINK_PARAM_NOT_EXISTS);
                    return result;
                }

                if(!validateLink(link)){
                    result.setStatus(false);
                    result.setMessage(MESSAGES.LINK_PARAM_WRONG_FORMAT);
                    return result;
                }

                // если пользователь указал свой subpart, то идём искать дубликат в бд
                if (subpart) {
                    const checkLink = await linkModel.getLinkBySubpart(subpart);
                    if (checkLink) {
                        // отправляем пользователю сообщение, что такой subpart уже существует
                        result.setStatus(false);
                        result.setMessage(MESSAGES.SUBPART_EXISTS);
                        return result;
                    }
                }
                const newLink = await linkModel.createLink(session, link, subpart ? subpart : generateString(7));
                result.setData(newLink);
                result.setMessage(MESSAGES.LINK_CREATED);
            } catch (err) {
                logger.error(err.stack);
                result.setStatus(false);
                result.setCode(500);
                result.setMessage(MESSAGES.INTERNAL_SERVER_ERROR);
            }
            return result;

        },
    }

}
