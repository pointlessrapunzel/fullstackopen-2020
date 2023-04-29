import { useEffect, useState } from "react";
import { getAllDiaries, postNewDiary } from "./services/diaryService";

type Diary = {
  id: string;
  date: string;
  weather: string;
  visibility: string;
};

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries()
      .then((json) => setDiaries(json))
      .catch((e) => console.error(e));
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const data = new FormData(e.currentTarget);
    postNewDiary(Object.fromEntries(data))
      .then((savedDiary) => {
        // successfull
        setDiaries(diaries.concat(savedDiary));
      })
      .catch((err) => {
        // unsuccessfull
        // show error message
        console.error(err);
      });
  }

  return (
    <>
      <h1>Ilari&apos;s flight diaries</h1>
      <section>
        <h2>add new entry</h2>
        <AddDiaryForm onSubmit={handleSubmit} />
      </section>
      <section>
        <h2>Diary entries</h2>
        <DiariesList diaries={diaries} />
      </section>
    </>
  );
}

function DiariesList({ diaries }: { diaries: Diary[] }) {
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

function DiaryItem({ item }: { item: Diary }) {
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
      <div>
        <label htmlFor="visibility">visibility</label>
        <input type="text" name="visibility" id="visibility" />
      </div>
      <div>
        <label htmlFor="weather">weather</label>
        <input type="text" name="weather" id="weather" />
      </div>
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
