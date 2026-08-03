const express = require('express');
const db = require('./database');

const app = express();
const PORT = 3000;

app.use(express.json()); // lets our server understand data sent from forms
app.use(express.json());
app.use(express.static('public'));

// 1. GET all expenses (READ)
app.get('/expenses', (req, res) => {
  const expenses = db.prepare('SELECT * FROM expenses ORDER BY date DESC').all();
  res.json(expenses);
});

// 2. ADD a new expense (CREATE)
app.post('/expenses', (req, res) => {
  const { title, amount, category, date } = req.body;
  const stmt = db.prepare('INSERT INTO expenses (title, amount, category, date) VALUES (?, ?, ?, ?)');
  const result = stmt.run(title, amount, category, date);
  res.json({ id: result.lastInsertRowid, title, amount, category, date });
});

// 3. UPDATE an existing expense
app.put('/expenses/:id', (req, res) => {
  const { title, amount, category, date } = req.body;
  const stmt = db.prepare('UPDATE expenses SET title = ?, amount = ?, category = ?, date = ? WHERE id = ?');
  stmt.run(title, amount, category, date, req.params.id);
  res.json({ message: 'Expense updated!' });
});

// 4. DELETE an expense
app.delete('/expenses/:id', (req, res) => {
  const stmt = db.prepare('DELETE FROM expenses WHERE id = ?');
  stmt.run(req.params.id);
  res.json({ message: 'Expense deleted!' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});