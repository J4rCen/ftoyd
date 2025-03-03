import axios from "axios"

class Fronttemp {
    private readonly apiUrl = 'https://app.ftoyd.com/fronttemp-service'

    public getMatchesStatistics = async () => {
        try {
            const result = await axios.get(this.apiUrl + '/fronttemp')
            return result
        } catch (error) {
            console.log(error)
        }
    }
}

export default new Fronttemp()