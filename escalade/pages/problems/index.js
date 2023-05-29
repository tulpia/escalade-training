import { useProblems } from "@/components/hooks/useProblems";

export default function Problems() {
  const { problems, isLoading, isError } = useProblems();

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  return (
    <section>
      <h1>Blocs</h1>
      {problems.length ? (
        <ul>
          {problems.map((problem) => (
            <li key={problem.id}>
              <a href={`problems/${problem.id}`}>{problem.level}</a>
            </li>
          ))}
        </ul>
      ) : (
        <p>Aucun probleme</p>
      )}
    </section>
  );
}
