function App() {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
    },
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
}

type HeaderProps = {
  name: string;
};

function Header({ name }: HeaderProps) {
  return <h1>{name}</h1>;
}

type CoursePart = {
  name: string;
  exerciseCount: number;
};

type ContentProps = {
  parts: CoursePart[];
};

function Content({ parts }: ContentProps) {
  return (
    <>
      {parts.map((p) => (
        <p key={p.name}>
          {p.name} {p.exerciseCount}
        </p>
      ))}
    </>
  );
}

type TotalProps = {
  parts: CoursePart[];
};

function Total({ parts }: TotalProps) {
  return (
    <>
      <p>
        Number of exercises{" "}
        {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  );
}

export default App;
