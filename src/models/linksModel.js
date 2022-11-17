import { dbStorage } from "../db/db.js";


export default {

    /**
    * returns all users links
    * @async
    * @function getUserLinks
    * @param {string} session user session
    * @returns {Promise<[{_id: string; link: string; subpart: string;}]>} returns all users link records
    * */
    getUserLinks: async (_session) => {
        return await dbStorage.DBO.collection('links').find({  session: _session }).toArray();
    },

     /**
    * get record by subpart
    * @async
    * @function getLinkBySubpart
    * @param {string} subpart subpart
    * @returns {Promise<{_id: string; link: string; subpart: string;}>} returns link record
    * */
    getLinkBySubpart: async (_subpart) => {
        return await dbStorage.DBO.collection('links').findOne({ subpart: _subpart });
    },

    /**
    * create new link record
    * @async
    * @function createLink
    * @param {string} session user session
    * @param {string} link full link
    * @param {string} subpart subpart
    * @returns {Promise<{_id: string; link: string; subpart: string;}>} returns created  record
    * */
    createLink: async (_session, _link, _subpart) => {
        var temp_datetime_obj = new Date();
        let result = await dbStorage.DBO.collection('links').insertOne({
             session: _session, 
             link: _link, 
             subpart: _subpart, 
             createdAt: new Date(temp_datetime_obj.toISOString())});
        if (result.insertedId) {
            result = { _id: result.insertedId, link: _link, subpart: _subpart };
        }
        return result;
    }
}
