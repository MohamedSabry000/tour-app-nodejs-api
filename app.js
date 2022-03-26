const express = require('express');
const morgan = require('morgan');
const path = require('path');
// const cors = require('cors')


const toursRouter = require('./routes/v1/tours');
const usersRouter = require('./routes/v1/users');
const authRouter = require('./routes/v1/auth');

const app = express();
app.use(express.json());
app.use(morgan('dev'));
app.use('/', express.static('/public'))

app.use('/static', express.static(path.join(__dirname, 'public')))

app.use('/api/v1/tours', toursRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1', authRouter);

app.all('*', (req, res) => {
    res.json({
        status: 'failure',
        message: 'wrong url'
    })
});

// const corsOptions = {
//     origin: 'http://localhost:5050'
// }
// app.use(cors());


app.use((err, req, res, next) => {
    console.log('global error handler');
    res.json(err);
});

module.exports = app;
