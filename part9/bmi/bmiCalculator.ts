function bmiCalculator() {
  if (process.argv.length != 4) {
    printUsage();
    console.error("Height and weight should be provided.");
    process.exit(1);
  }

  const height = +process.argv[2];
  const weight = +process.argv[3];

  if (Number.isNaN(height) || Number.isNaN(weight)) {
    printUsage();
    console.error("Height and weight should be numbers.");
    process.exit(2);
  }

  console.log(`BMI for height ${height}cm and weight ${weight}kg:`);
  console.log(calculateBmi(height, weight));
}

const BMIThresholds = [
  [16, "Underweight (Severe thinness)"],
  [17, "Underweight (Moderate thinness)"],
  [18.5, "Underweight (Mild thinness)"],
  [25, "Normal (healthy weight)"],
  [30, "Overweight (Pre-obese)"],
  [35, "Obese (Class I)"],
  [40, "Obese (Class II)"],
  [Number.MAX_SAFE_INTEGER, "Obese (Class III)"],
] as [number, string][];

function calculateBmi(height: number, weight: number) {
  const heightInMeters = height / 100;
  const bmi = weight / heightInMeters ** 2;

  for (let [val, txt] of BMIThresholds) {
    if (bmi < val) return txt;
  }
}

bmiCalculator();

function printUsage() {
  console.info(
    "This program calculates Body Mass Index (BMI) if provided with height in centimeters and weight in kilograms."
  );
  console.info("Usage: calculateBmi height weight");
}
