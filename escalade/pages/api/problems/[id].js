const getProblem = async (id) => {
  const data = await fetch(`http://localhost:3001/problems/${id}`);
  const res = await data.json();

  return res;
};

export default async function handler(req, res) {
  const { id } = req.query;
  const problems = await getProblem(id);

  res.status(200).json(problems);
}
