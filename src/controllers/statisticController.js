import { Result } from "../classes/Result.js";
import statisticModel from "../models/statisticModel.js";
import { MESSAGES } from "../consts.js";
import { logger } from "../logging/log.js";

export const initStatController = () => {

    return {

        /**
        * returns all statistic
        * @async
        * @function getStat
        * @param {string} session users session
        * @return {Promise<Result>} returns full statistic
        * */
        getStat: async () => {
            const result = new Result();
            try {
                //получаем полный список ссылок пользователя
                const statistic = await statisticModel.getStatistic();
                result.setData(statistic);
            } catch (err) {
                logger.error(err.message);
                result.setStatus(false);
                result.setCode(500);
                result.setMessage(MESSAGES.INTERNAL_SERVER_ERROR);
            }
            return result;
        },

        /**
      * updates the user's statistics of links usage
      * @async
      * @function updateUserStat
      * @param {string} session users session
      * @return {Promise<Result>} 
      * */
        updateUserStat: async (session) => {
            const result = new Result();
            try {
                //увеличиваем счётчик использования ссылок пользователем
                const statData = await statisticModel.updateStat(session);
                if (statData.acknowledged)
                    result.setData(statData);
            } catch (err) {
                logger.error(err.message);
                result.setStatus(false);
                result.setCode(500);
                result.setMessage(MESSAGES.INTERNAL_SERVER_ERROR);
            }
            return result;
        },

    }

}
