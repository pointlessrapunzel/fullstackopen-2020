import { CoursePart, courseParts } from "./data/parts";

function App() {
  const courseName = "Half Stack application development";

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

function Part({ part }: { part: CoursePart }) {
  let partDetails: () => React.ReactNode;

  switch (part.kind) {
    case "group":
      partDetails = () => (
        <p style={{ margin: 0 }}>project exercises {part.groupProjectCount}</p>
      );
      break;
    case "basic":
      partDetails = () => (
        <p style={{ margin: 0, fontStyle: "italic" }}>{part.description}</p>
      );
      break;
    case "background":
      partDetails = () => (
        <>
          <p style={{ margin: 0, fontStyle: "italic" }}>{part.description}</p>
          <p style={{ margin: 0 }}>
            background material:{" "}
            <a href={part.backgroundMaterial}>{part.backgroundMaterial}</a>
          </p>
        </>
      );
      break;
    case "special":
      partDetails = () => (
        <>
          <p style={{ margin: 0, fontStyle: "italic" }}>{part.description}</p>
          <p style={{ margin: 0 }}>
            required skills: {part.requirements.join(", ")}
          </p>
        </>
      );
      break;
    default: {
      const _exhaustiveCheck: never = part;
      console.error(_exhaustiveCheck);
      throw new Error("Exhaustive check failed on `part.kind`.");
    }
  }

  return (
    <div>
      <h2 style={{ margin: 0, fontSize: "1rem" }}>
        {part.name} {part.exerciseCount}
      </h2>
      {partDetails()}
    </div>
  );
}

type ContentProps = {
  parts: CoursePart[];
};

function Content({ parts }: ContentProps) {
  return (
    <ul
      style={{
        listStyle: "none",
        padding: 0,
        display: "flex",
        flexDirection: "column",
        gap: ".5rem",
      }}
    >
      {parts.map((p) => (
        <li key={p.name}>
          <Part part={p} />
        </li>
      ))}
    </ul>
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
