import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from "./exerciseCalculator";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.post("/exercises", (req, res) => {
  if (!(req.body.target && req.body.daily_exercises))
    return res.json({ error: "parameters missing" });

  const target = +req.body.target;

  if (Number.isNaN(target))
    return res.json({ error: "malformatted parameters" });

  const daily_exercises = req.body.daily_exercises;

  if (
    !Array.isArray(daily_exercises) ||
    daily_exercises.some((v) => Number.isNaN(+v))
  )
    return res.json({ error: "malformatted parameters" });

  const parsedDailyExercises = daily_exercises.map((v) => +v);

  return res.json(calculateExercises(parsedDailyExercises, target));
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});
