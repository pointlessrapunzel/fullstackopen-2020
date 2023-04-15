import express from "express";
import { calculateBmi } from "./bmiCalculator";

const app = express();
app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = req.query.height;
  const weight = req.query.weight;

  if (!(height && weight) || Number.isNaN(+height) || Number.isNaN(+weight)) {
    return res.json({ error: "malformatted parameters" });
  }

  return res.json({
    height,
    weight,
    bmi: calculateBmi(+height, +weight),
  });
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
