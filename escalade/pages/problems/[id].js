import { useRouter } from "next/router";
import { useProblems } from "@/components/useProblems";

export default function Problem() {
  const router = useRouter();
  const { id } = router.query;
  const { problems, isLoading, isError } = useProblems(id);

  if (isLoading) {
    return <p>Chargement...</p>;
  }

  console.log(problems);

  return (
    <section>
      <h1>ID {id}</h1>
    </section>
  );
}
