const app = require('./api/server');

const { PORT = 8000 } = process.env;

app.listen(PORT, console.log(`***  Server running on localhost:${PORT}  ***`));