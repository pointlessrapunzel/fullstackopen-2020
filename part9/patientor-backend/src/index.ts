import express from "express";
import cors from "cors";

const app = express();

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/ping", (_, res) => {
  res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
