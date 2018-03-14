import { createClient, switchClient } from '../services/http.service'
import config from '../config/config';

function sendEmail(req, res) {
    console.log(req.body);
    const http = createClient(config.agent);
    request(http, req, res);
}

function request(http, req, res, retry = true) {
    http.send(req.body)
        .then(response => {
            console.log('Email sent successfully');
            res.status(response.status).json('Email sent successfully');
        })
        .catch(err => {
            if (retry) {
                console.log('Provider failed, switch to another one.');
                const newClient = switchClient(http);
                // only switch once.
                request(newClient, req, res, false);
            } else {
                res.status(err.response.status).send(err.response.data)
            }
        })
}

export default { sendEmail }
