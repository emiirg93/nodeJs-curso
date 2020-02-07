const express = require('express');
const app = express();

const { config } = require('./config/index');
const moviesApi = require('./routes/movies');
const { logErrors, wrapErrors, errorHandler } = require('./utils/middleware/errorHandlers');
const notFoundHandler = require('./utils/middleware/notFundHandler');

app.use(express.json());

moviesApi(app);
//captura el error 404
app.use(notFoundHandler);
//Manejadores de errores.
//los middlewares tienen que ir despues de las rutas si o si.
app.use(logErrors);
app.use(wrapErrors);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`escuchando en el puerto http://localhost:${config.port}`);
});
