import HttpClient from '../services/http.service'
import { Format } from '../services/format.service'
import config from '../config/config';

function sendEmail(req, res) {
    console.log(req.body);
    const http = HttpClient.createClient(config.agent);
    http.send(req.body)
        .then(response => {
            console.log(response);
            res.status(response.status).json('Email sent successfully');
        })
        .catch(err => {
            console.log(err);
            res.status(err.response.status).send(err.response.data)
        })
}

export default { sendEmail }