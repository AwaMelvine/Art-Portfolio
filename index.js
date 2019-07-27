import app from "./api/server";

const { PORT = 5000 } = process.env;

app.listen(PORT, console.log(`***  Server running on localhost:${PORT}  ***`));