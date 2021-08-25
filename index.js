const {axiosPromise} = require('khala-axios')

class API {
    // https://api.walkscore.com/score?format=json&
    // address=1119%8th%20Avenue%20Seattle%20WA%2098101&lat=47.6085&
    // lon=-122.3295&transit=1&bike=1&wsapikey=<YOUR-WSAPIKEY>
    constructor(apikey, logger = console) {
        this.endpoint = 'https://api.walkscore.com/score'
        Object.assign(this, {apikey, logger})
    }

    async get(address, getTransit, getBike) {
        const url = this.endpoint
        const {apikey} = this
        const params = {
            format: 'json',
            transit: getTransit && 1, // TODO What is this
            bike: getBike && 1, // TODO What is this
            wsapikey: apikey,
            address,
            lat: 47.6085,
            lon: -122.3295,
        }
        const result = await axiosPromise({url, params, method: 'GET'})
        const {
            status,
            walkscore,
            description,
            updated,
            logo_url,
            more_info_icon,
            more_info_link,
            ws_link,
            transit: {
                score: transitScore,
                description: transitDescription,
                summary: transitSummary,
            },
            bike
        } = result
        const {score: bikeScore, description: bikeDescription} = bike

        //HTTP Response	Status Code	Description
        // 200	1	Walk Score successfully returned.
        // 200	2	Score is being calculated and is not currently available.
        // 404	30	Invalid latitude/longitude.
        // 500 series	31	Walk Score API internal error.
        // 200	40	Your WSAPIKEY is invalid.
        // 200	41	Your daily API quota has been exceeded.
        // 403	42	Your IP address has been blocked.
        switch (status) {
            case 1:
                // green
                break;
            case 2:
                throw Error('Score is being calculated and is not currently available.')
            case 40:
                throw Error('Your Walk Score APIKEY is invalid.')
            case 41:
                throw Error('Your daily API quota has been exceeded.')
        }
        return result
    }

}

module.exports = API