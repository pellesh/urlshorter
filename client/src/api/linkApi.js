import { transport } from "./transport"
export const linkApi = {

    getUserLinks: async () => {
        return await transport.get('/link');
    },

    addUserLink: async (values) => {
        return await transport.post('/link', { link: values.link, subpart: values.subpart }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }


}