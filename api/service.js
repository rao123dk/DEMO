const { getCampaignsAPI }= require('./externalAPi')

async function getCampaigns(request, response) {
    try {
        const { sortBy, sortOrder } = request.query;
        const campaignsList = await getCampaignsAPI()
        const result = campaignsList.sort((a,b)=> {
            return (sortOrder.toLowerCase() === 'desc' ? a[sortBy] > b[sortBy] : a[sortBy] < b[sortBy])  ? 1 : -1
        })
        .map((item)=>{
            return {
                'Title': item.title,
                'Total Amount':item.totalAmount,
                'Backers Count' : item.backersCount,
                'End Date': item.endDate
            }
        })
        response.status(200).json(result)
    } catch (error) {
        console.error(error)
    }
};

async function activeCampaigns(request, response) {
    try {
        const campaignsList = await getCampaignsAPI()
        const result = campaignsList.filter(({endDate})=>{
            return new Date(endDate)  > new Date()
        })
        response.status(200).json(result)
    } catch (error) {
        console.error(error)
    }
}

async function closedCampaigns(request, response) {
    try {
        const campaignsList = await getCampaignsAPI()
        const result = campaignsList.filter(({endDate, procuredAmount, totalAmount})=>{
            return (new Date(endDate)  < new Date() || (procuredAmount >= totalAmount) )
        })
        response.status(200).json(result)
    } catch (error) {
        console.error(error)
    }
}

module.exports = { getCampaigns, activeCampaigns, closedCampaigns };