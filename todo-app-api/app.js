const { pool } = require('./config/db');
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const taskRoutes = require("./routes/taskRoutes");
const notFound = require("./middlewares/notFound");
const errorHandler = require("./middlewares/errorHandler");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Todo List API is running",
  });
});

/* 1. GET ALL TASKS */
app.get('/tasks', async (req, res) => {
  const [rows] = await pool.query('SELECT * FROM tasks');
  res.json(rows);
});

/* 2. GET ONE TASK */
app.get('/tasks/:id', async (req, res) => {
  const [rows] = await pool.query(
    'SELECT * FROM tasks WHERE id = ?',
    [req.params.id]
  );
  res.json(rows[0]);
});

/* 3. CREATE TASK */
app.post('/tasks', async (req, res) => {
  const { title, description, completed } = req.body;

  const [result] = await pool.query(
    'INSERT INTO tasks (title, description, completed) VALUES (?, ?, ?)',
    [title, description, completed]
  );

  res.json({
    id: result.insertId,
    title,
    description,
    completed,
  });
});

/* 4. UPDATE TASK */
app.put('/tasks/:id', async (req, res) => {
  const { title, description, completed } = req.body;

  await pool.query(
    'UPDATE tasks SET title = ?, description = ?, completed = ? WHERE id = ?',
    [title, description, completed, req.params.id]
  );

  res.json({ message: 'updated' });
});

/* 5. DELETE TASK */
app.delete('/tasks/:id', async (req, res) => {
  await pool.query(
    'DELETE FROM tasks WHERE id = ?',
    [req.params.id]
  );

  res.json({ message: 'deleted' });
});


app.use("/todos", taskRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
