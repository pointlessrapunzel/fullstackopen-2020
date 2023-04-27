import { useEffect, useState } from "react";

type Diary = {
  id: string;
  date: string;
  weather: string;
  visibility: string;
};

function App() {
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/diaries")
      .then<Diary[]>((res) => res.json())
      .then((json) => setDiaries(json));
  }, []);

  return (
    <>
      <h1>Ilari&apos;s flight diaries</h1>
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

export default App;
