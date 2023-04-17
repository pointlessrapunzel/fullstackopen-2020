import express from "express";
import cors from "cors";
import diagnosesRouter from "./routes/diagnoses";

const app = express();

app.use((cors as (options: cors.CorsOptions) => express.RequestHandler)({}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/ping", (_, res) => {
  res.send("pong");
});

app.use("/api/diagnoses", diagnosesRouter);

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
