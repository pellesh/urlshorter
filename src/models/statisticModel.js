import { dbStorage } from "../db/db.js";


export default {

    /**
    * returns all statistic
    * @async
    * @function getStatistic
    * @returns {Promise<[{_id: string;  count: number;}]>} returns all statistic
    * */
    getStatistic: async () => {
        return await dbStorage.DBO.collection('statistic').find().toArray();
    },


    /**
       * create new statistic record
       * @async
       * @function createLink
       * @param {string} session user session
       * @returns {Promise<UpdateResult>} returns created  record
       * */
    updateStat: async (_session) => {
        return await dbStorage.DBO.collection('statistic').updateOne({ session: _session},{
            $inc: {count: 1}
        },{ upsert: true })
   
    }
}
