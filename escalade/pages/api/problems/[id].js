const getProblem = async (id) => {
  const data = await fetch(`http://localhost:3001/problems/${id}`);
  const res = await data.json();

  return res;
};

const updateProblem = async (id, body) => {
  const data = await fetch(`http://localhost:3001/problems/${id}`, {
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
    const { id } = req.query;
    const { body } = req;
    const problems = await updateProblem(id, body);

    res.status(200).json(problems);
  } else {
    const { id } = req.query;
    const problems = await getProblem(id);

    res.status(200).json(problems);
  }
}
