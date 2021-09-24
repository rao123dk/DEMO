const axios = require('axios');


async function getCampaignsAPI() {
    try {
        const response = await axios.get(process.env.DONATE_KART_API);
       // console.log("Fetched campaigns",{...response.data});
        return response.data;
      } catch (error) {
        console.error(error);
      }
   return
}

module.exports = { getCampaignsAPI };