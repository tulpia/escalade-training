const Pool = require("pg").Pool;
const pool = new Pool({
  user: "escalade",
  host: "localhost",
  database: "escalade",
  password: "Famous0512",
  port: 5432,
});

const getTractions = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM tractions ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getTraction = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM tractions WHERE id = $1 ORDER BY id ASC",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        if (!results.rows.length) {
          resolve({});
        }
        resolve(results.rows[0]);
      }
    );
  });
};

const createTraction = (body) => {
  return new Promise(function (resolve, reject) {
    const { nb_tractions, date } = body;
    pool.query(
      "INSERT INTO tractions (nb_tractions, date) VALUES ($1, $2) RETURNING *",
      [nb_tractions, date],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows[0]);
      }
    );
  });
};

const updateTraction = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { nb_tractions } = body;
    pool.query(
      "UPDATE tractions SET nb_tractions = $1 WHERE id = $2 RETURNING *",
      [nb_tractions, id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows[0]);
      }
    );
  });
};

const deleteTraction = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query(
      "DELETE FROM tractions WHERE id = $1",
      [id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(`Traction deleted with ID: ${id}`);
      }
    );
  });
};

module.exports = {
  getTractions,
  createTraction,
  deleteTraction,
  getTraction,
  updateTraction,
};
