export const WEATHER = {
  sunny: "sunny",
  rainy: "rainy",
  cloudy: "cloudy",
  stormy: "stormy",
  windy: "windy",
} as const;

export const VISIBILITY = {
  great: "great",
  good: "good",
  ok: "ok",
  poor: "poor",
} as const;

export type Weather = (typeof WEATHER)[keyof typeof WEATHER];
export type Visibility = (typeof VISIBILITY)[keyof typeof VISIBILITY];

export type DiaryEntry = {
  id: number;
  date: string;
  weather: Weather;
  visibility: Visibility;
  comment: string;
};

export type NewDiaryEntry = Omit<DiaryEntry, "id">;

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, "comment">;
