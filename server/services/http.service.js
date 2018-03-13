import axios from 'axios';

class HttpClient {

    constructor() {
        this.apiKey = '';
    }
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }
    send(body) {
        return axios.post('https://api.sendgrid.com/v3/mail/send', body, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            }
        })
    }
}
export default HttpClient;