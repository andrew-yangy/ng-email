import app from './config/express';
import config from './config/config';

// listen on port config.port
app.listen(config.port, () => {
    console.info(`server started on port ${config.port} (${config.env})`);
});
export default app;