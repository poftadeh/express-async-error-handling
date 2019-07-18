const express = require('express');
const app = express();
const PORT = process.env.PORT || 8080;
require('express-async-errors');

const wrapper = fn => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const foo = () => Promise.reject('rejected');

app.get('/', async (req, res) => {
  await foo();
  res.send('Hi');
});

app.use((err, req, res, next) => {
  res.send(err);
});

app.listen(PORT, () => console.log(`Listening on ${PORT}`));
