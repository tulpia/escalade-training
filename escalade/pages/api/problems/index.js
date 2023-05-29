const getProblems = async () => {
  const data = await fetch("http://localhost:3001/problems/");
  const res = await data.json();

  return res;
};

export default async function handler(req, res) {
  const problems = await getProblems();

  res.status(200).json(problems);
}
