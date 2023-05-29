const Pool = require("pg").Pool;
const pool = new Pool({
  user: "escalade",
  host: "localhost",
  database: "escalade",
  password: "Famous0512",
  port: 5432,
});

const getProblems = () => {
  return new Promise(function (resolve, reject) {
    pool.query("SELECT * FROM problems ORDER BY id ASC", (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(results.rows);
    });
  });
};

const getProblem = (id) => {
  return new Promise(function (resolve, reject) {
    pool.query(
      "SELECT * FROM problems WHERE id = $1 ORDER BY id ASC",
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

const createProblem = (body) => {
  return new Promise(function (resolve, reject) {
    const { level, tries, date } = body;
    pool.query(
      "INSERT INTO problems (level, tries, date) VALUES ($1, $2, $3) RETURNING *",
      [level, tries, date],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows[0]);
      }
    );
  });
};

const updateProblem = (id, body) => {
  return new Promise(function (resolve, reject) {
    const { level, tries } = body;
    pool.query(
      "UPDATE problems SET level = $1, tries = $2 WHERE id = $3 RETURNING *",
      [level, tries, id],
      (error, results) => {
        if (error) {
          reject(error);
        }
        resolve(results.rows[0]);
      }
    );
  });
};

const deleteProblem = () => {
  return new Promise(function (resolve, reject) {
    const id = parseInt(request.params.id);
    pool.query("DELETE FROM problems WHERE id = $1", [id], (error, results) => {
      if (error) {
        reject(error);
      }
      resolve(`Problem deleted with ID: ${id}`);
    });
  });
};

module.exports = {
  getProblems,
  createProblem,
  deleteProblem,
  getProblem,
  updateProblem,
};
