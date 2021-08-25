const API = require('../index')
describe('walk score', () => {
    const {API_KEY} = process.env
    const api = new API(API_KEY)
    it('get', async () => {
        const address = '1119%8th%20Avenue%20Seattle%20WA%2098101'
        const result = await api.get(address)

    })
})