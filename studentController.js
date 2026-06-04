const pool = require("../config/db");

const addStudent = async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      "INSERT INTO students(name,email) VALUES($1,$2) RETURNING *",
      [name, email]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getStudents = async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM students ORDER BY id DESC"
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addStudent, getStudents };
