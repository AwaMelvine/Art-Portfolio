import express from 'express';
import helmet from 'helmet';

const app = express();

app.use(helmet())

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Page Not Found' }); 
});

export default app;