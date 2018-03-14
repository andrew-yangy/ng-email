import axios from 'axios';
import config from '../config/config';
import { SendgridFormat, MailgunFormat } from './format.service';
var Mailgun = require('mailgun-js');

class HttpClient {
    static createClient(agent) {
        if (agent === 'mailgun') {
            return new MailGun();
        } else if (agent === 'sendgrid') {
            return new SendGrid();
        }
    }
}
class MailGun {
    constructor() {
        this.url = 'https://api.mailgun.net/v3/app.ozgoal.com/messages';
        this.apiKey = 'key-cd9044460f0ce446d73b74f662fb0273'
    }

    send(data) {
        // const body = new MailgunFormat(data);
        // console.log(body);
        const body = {
            from: 'Excited User <me@samples.mailgun.org>',
            to: 'ddvkid@gmail.com',
            subject: 'Hello',
            text: 'Testing some Mailgun awesomness!'
        };
        return axios.post(this.url, JSON.stringify(body), {
            headers: {
                'Authorization': 'Basic ' + Buffer.from('api:' + this.apiKey).toString('base64')
            }
        })
    }
}
class SendGrid {
    constructor() {
        this.url = 'https://api.sendgrid.com/v3/mail/send';
        this.apiKey = config.sendgrid_key;
    }

    send(data) {
        const body = new SendgridFormat(data);
        return axios.post(this.url, body, {
            headers: {
                Authorization: `Bearer ${this.apiKey}`
            }
        })
    }
}
export default HttpClient;