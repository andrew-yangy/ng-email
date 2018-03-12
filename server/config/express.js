import express from 'express';
const app = express();
app.get('*', (req, res) => {
    res.sendFile(path.join(appRoot.path, 'dist/index.html'));
});
export default app;