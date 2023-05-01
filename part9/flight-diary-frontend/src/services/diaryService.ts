import { NonSensitiveDiaryEntry } from "../types";

const BASE_URL = "http://localhost:3000/api/diaries";

export async function getAllDiaries(): Promise<NonSensitiveDiaryEntry[]> {
  const res = await fetch(BASE_URL);
  if (res.ok) {
    const result: NonSensitiveDiaryEntry[] = await res.json();
    return result;
  } else {
    throw new Error("There has been an error fetching the diaries.");
  }
}

export async function postNewDiary(newDiary: {
  [k: string]: FormDataEntryValue;
}): Promise<NonSensitiveDiaryEntry> {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newDiary),
  });

  if (res.ok) return await res.json();
  else throw new Error(await res.text());
}
