import { transport } from "./transport"
export const statisticApi = {

    getStatistic: async () => {
        return await transport.get('/statistic');
    },

}