const express = require('express');

const bodyParser = require('body-parser');

const usersRouter = require('./routes');
const { PORT } = require('./config.json');

const app = express();

app.use(bodyParser.json());

app.listen(PORT, async () => {
    console.log(`Example app listening at http://localhost:${PORT}`);
});

app.use('/', usersRouter);