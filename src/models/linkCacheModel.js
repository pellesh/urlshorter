import { redisStorage } from "../cache/cacheStorage.js";

export default {

    /**
     * return full link by subpart
     * @async
     * @function getLinkBySubpart
     * @param {string} subpart subpart
     * @return {Promise<string>} return full link by subpart
     * */
    getLinkBySubpart: async (subpart) => {
        return await redisStorage.client.get(subpart);
    },
    /**
     * adds association subpart - full link
     * @async
     * @function addLink
     * @param {string} link full link
     * @param {string} subpart subpart
     * @return {Promise<number>} the number of fields that were added
     * */
    addLink: async (link, subpart) => {
        const result =  await redisStorage.client.set(subpart, link);
        if(process.env.REDIS_CACHE_TTL)
            await redisStorage.client.expire(subpart, process.env.REDIS_CACHE_TTL);
        return result;
    }

}