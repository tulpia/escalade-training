const getTractions = async () => {
  const data = await fetch("http://localhost:3001/tractions/");
  const res = await data.json();

  return res;
};

const createTraction = async (body) => {
  const data = await fetch(`http://localhost:3001/tractions/`, {
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
    const tractions = await createTraction(body);

    res.status(200).json(tractions);
  } else {
    const tractions = await getTractions();

    res.status(200).json(tractions);
  }
}
