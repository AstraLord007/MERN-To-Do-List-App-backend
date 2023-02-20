const express = require('express');
const mongoose = require('mongoose');
const app = express();
const cors = require('cors');
const Todo = require('./src/models/Todo');
require('dotenv').config();

app.use(express.json({ extended: true }));
app.use(express.urlencoded());
app.use(cors());


mongoose.connect(process.env.DB_URL).then(() => {
  console.log('Conectado a MongoDB');
  server = app.listen(process.env.API_PORT, () => {
    console.log(`Aplicacion escuchando en puerto ${process.env.API_PORT}`);
  })
});

app.get('/todos', async (req, res) => {
  const todos = await Todo.find();

  res.json(todos);
});

app.post('/todo/new', (req, res) => {
  const todo = new Todo({
    text: req.body.text
  });
  todo.save();
  res.json(todo);
});

app.delete('/todo/delete/:id', async (req, res) => {
  const result = await Todo.findByIdAndDelete(req.params.id);

  res.json(result);
});

app.get('/todo/complete/:id', async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  todo.complete = !todo.complete;

  todo.save();

  res.json(todo);
});
