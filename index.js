import app from "./api/server";

const { PORT = 8080 } = process.env;

app.listen(PORT, console.log(`***  Server running on localhost:${PORT}  ***`));