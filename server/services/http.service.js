import axios from 'axios';

class HttpClient {

    constructor() {
        this.apiKey = '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';
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