const getProblems = async () => {
  const data = await fetch("http://localhost:3001/problems/");
  const res = await data.json();

  return res;
};

const createProblem = async (body) => {
  const data = await fetch(`http://localhost:3001/problems/`, {
    body: JSON.stringify(body),
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await data.json();

  return res;
};

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { body } = req;
    const problems = await createProblem(body);

    res.status(200).json(problems);
  } else {
    const problems = await getProblems();

    res.status(200).json(problems);
  }
}
