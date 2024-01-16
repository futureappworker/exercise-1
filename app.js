const express = require('express');
const path = require('path');
const apiRouter = require('./src/api');

const app = express();
const port = 3000;

app.use(express.static('src/public'));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/src/views'));

app.get('/', (req, res) => {
  res.render('home');
});

app.use(apiRouter);

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
