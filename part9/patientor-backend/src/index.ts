import express from "express";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/api/ping", (_, res) => {
  res.send("pong");
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
