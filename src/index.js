const express = require('express');
const cors = require('cors');


//Routes
const UserRoutes = require('./api/users/user.routes');

const { connectDb } = require('./helpers/db');
const { setError } = require('./helpers/utils')

const PORT = process.env.PORT || 8000;

const app = express();

connectDb();

app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,PATCH'); //Lo que tu permitas que entre a tu servidor
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

app.use(
    cors({
        origin: (_origin, callback) => callback(null, true),
        credentials: true
    })
);

app.use(express.json({limit: '1mb'}));

app.use(express.urlencoded({limit: '1mb', extended: true}));


//Routes
app.use('/api/user', UserRoutes);


//RUTAS NO ENCONTRADAS

app.use('*', (_req, _res, next) => {
    return next(setError(404, 'Route not found'));
});

//Error Handler
app.use((error, _req, res, _next) => {
    return res
        .status(error.status || 500)
        .json(error.message || 'Unexpected error')
});


app.disable('x-powered-by');

// Open Server
app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});