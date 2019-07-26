import express from 'express';
import helmet from 'helmet';
import cors from 'cors';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Page Not Found' });
});

export default app;