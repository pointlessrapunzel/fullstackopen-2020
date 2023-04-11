const RATINGS = {
  1: "try harder next time",
  2: "not too bad but could be better",
  3: "excellent",
} as const;

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

const expected = {
  periodLength: 7,
  trainingDays: 5,
  success: false,
  rating: 2,
  ratingDescription: "not too bad but could be better",
  target: 2,
  average: 1.9285714285714286,
};
const testParams = [[3, 0, 2, 4.5, 0, 3, 1], 2] as [number[], number];

console.log(calculateExercises(...testParams));
