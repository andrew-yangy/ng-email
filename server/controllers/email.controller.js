import HttpClient from '../services/http.service'
import { Format } from '../services/format.service'

function sendEmail(req, res) {
    console.log(req.body);
    const http = new HttpClient();
    const emailBody = Format.create(req.body);
    console.log(emailBody);
    http.send(emailBody)
        .then(response => {
            console.log(response)
            res.status(response.status).json('Email sent successfully');
        })
        .catch(err => {
            console.log(err);
            res.status(err.response.status).send(err.response.data)
        })
}

export default { sendEmail }