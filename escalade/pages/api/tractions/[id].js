const getTraction = async (id) => {
  const data = await fetch(`http://localhost:3001/tractions/${id}`);
  const res = await data.json();

  return res;
};

const updateTraction = async (id, body) => {
  const data = await fetch(`http://localhost:3001/tractions/${id}`, {
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
    const tractions = await updateTraction(id, body);

    res.status(200).json(tractions);
  } else {
    const { id } = req.query;
    const tractions = await getTraction(id);

    res.status(200).json(tractions);
  }
}
