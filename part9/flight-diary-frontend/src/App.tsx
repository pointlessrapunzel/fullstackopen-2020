import { useEffect, useState } from "react";
import { getAllDiaries, postNewDiary } from "./services/diaryService";
import { NonSensitiveDiaryEntry, VISIBILITY, WEATHER } from "./types";

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    getAllDiaries()
      .then((json) => setDiaries(json))
      .catch((e) => console.error(e));
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    postNewDiary(Object.fromEntries(new FormData(form)))
      .then((savedDiary) => {
        // successfull
        setDiaries(diaries.concat(savedDiary));
        form.reset();
      })
      .catch((err) => {
        // unsuccessfull
        // show error message
        if (err instanceof Error) setFormError(err.message);
        console.error(err);
      });
  }

  return (
    <>
      <h1>Ilari&apos;s flight diaries</h1>
      <section>
        <h2>add new entry</h2>
        {formError ? <p style={{ color: "red" }}>{formError}</p> : null}
        <AddDiaryForm onSubmit={handleSubmit} />
      </section>
      <section>
        <h2>Diary entries</h2>
        <DiariesList diaries={diaries} />
      </section>
    </>
  );
}

function DiariesList({ diaries }: { diaries: NonSensitiveDiaryEntry[] }) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {diaries.map((d) => (
        <li key={d.id}>
          <DiaryItem item={d} />
        </li>
      ))}
    </ul>
  );
}

function DiaryItem({ item }: { item: NonSensitiveDiaryEntry }) {
  return (
    <>
      <h3>{item.date}</h3>
      <div>
        <span>visibility: {item.visibility}</span>
        <br />
        <span>weather: {item.weather}</span>
      </div>
    </>
  );
}

type DiaryFormProps = {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
};

function AddDiaryForm({ onSubmit }: DiaryFormProps) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="date">date</label>
        <input type="date" name="date" id="date" />
      </div>
      <fieldset className="form-fieldset">
        <legend>visibility</legend>
        {Object.values(VISIBILITY).map((v) => {
          const id = `visibility-${v}`;
          return (
            <div key={id}>
              <label htmlFor={id}>{v}</label>
              <input type="radio" name="visibility" id={id} value={v} />
            </div>
          );
        })}
      </fieldset>
      <fieldset>
        <legend>weather</legend>
        {Object.values(WEATHER).map((w) => {
          const id = `weather-${w}`;
          return (
            <div key={id}>
              <label htmlFor={id}>{w}</label>
              <input type="radio" name="weather" id={id} value={w} />
            </div>
          );
        })}
      </fieldset>
      <div>
        <label htmlFor="comment">comment</label>
        <input type="text" name="comment" id="comment" />
      </div>
      <div>
        <input type="submit" value="add" />
      </div>
    </form>
  );
}

export default App;
