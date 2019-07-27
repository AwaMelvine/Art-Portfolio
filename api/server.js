import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import appRoutes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());


app.use(appRoutes);


app.use('*', (req, res) => {
    res.status(404).json({ error: 'Page Not Found' });
});

export default app;