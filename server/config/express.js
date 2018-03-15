import express from 'express';
import routes from '../routes/index.route';
import path from 'path';
import appRoot from 'app-root-path';
import bodyParser from 'body-parser';
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', express.static(appRoot.path + '/dist'));
app.get('*', (req, res) => {
    res.sendFile(path.join(appRoot.path, 'dist/index.html'));
});

app.use('/api', routes);

export default app;