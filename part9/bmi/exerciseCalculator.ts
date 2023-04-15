const RATINGS = {
  1: "try harder next time",
  2: "not too bad but could be better",
  3: "excellent",
} as const;

function exerciseCalculator(): void {
  const target = +process.argv[2];
  const dailyHours = process.argv.slice(3).map((v) => +v);

  if ([target, ...dailyHours].some((v) => Number.isNaN(v))) {
    console.log("One of the provided arguments wasn't a number.");
    return process.exit(1);
  }

  const res = calculateExercises(dailyHours, target);
  console.log(res);
}

exerciseCalculator();

interface Result {
  periodLength: number;
  trainingDays: number;
  success: Boolean;
  rating: keyof typeof RATINGS;
  ratingDescription: typeof RATINGS[Result["rating"]];
  target: number;
  average: number;
}

function calculateExercises(dailyHours: number[], target: number): Result {
  const trainingHours = dailyHours.reduce((sum, cur) => sum + cur);
  const average = trainingHours / dailyHours.length;
  const trainingDays = dailyHours.reduce((sum, cur) => sum + +(cur > 0), 0);
  let rating: Result["rating"] = 1;
  const success = average >= target;
  if (success) rating = 3;
  else if (target - average < 0.3) rating = 2;

  return {
    periodLength: dailyHours.length,
    trainingDays,
    success,
    rating,
    ratingDescription: RATINGS[rating],
    target,
    average,
  };
}
