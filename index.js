import express from 'express';
const app = express();
const port = 3000;
import authorsRouter from './routes/authors.js';
import booksRouter from './routes/books.js';
import publishersRouter from './routes/publishers.js';

app.use('/authors', authorsRouter);
app.use('/books', booksRouter);
app.use('/publishers', publishersRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});