import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import trimmer from 'express-trimmer';
import appRoutes from './routes';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(trimmer);

app.use(appRoutes);

app.use(express.static(path.join(__dirname, "..", "client", "build")))

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

const { PORT = 8000, DB_ENV } = process.env;
if (DB_ENV !== 'testing') {
    app.listen(PORT, console.log(`***  Server running on localhost:${PORT}  ***`));
}

export default app;