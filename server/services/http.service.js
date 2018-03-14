import axios from 'axios';
import config from '../config/config';
import { SendgridFormat, MailgunFormat } from './format.service';
import querystring from 'querystring';

export function createClient(agent) {
	if (agent === 'mailgun') {
		return new MailGun();
	} else if (agent === 'sendgrid') {
		return new SendGrid();
	}
}
export function switchClient(client) {
	if (client instanceof MailGun) {
		return new SendGrid();
	} else if (client instanceof SendGrid) {
		return new MailGun();
	}
}
class MailGun {
    constructor() {
        this.url = config.mailgun_url;
        this.apiKey = config.mailgun_key;
    }

    send(data) {
        const body = new MailgunFormat(data);
        return axios.post(this.url, querystring.stringify(body), {
            headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + Buffer.from('api:' + this.apiKey).toString('base64')
            }
        })
    }
}
class SendGrid {
    constructor() {
        this.url = config.sendgrid_url;
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
