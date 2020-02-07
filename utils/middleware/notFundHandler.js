const boom = require('@hapi/boom');

function notFoundHandler(req, res) {
    const { output: {statusCode,playload} }= boom.notFound();

    res.status(statusCode).json(playload);
}

module.exports = notFoundHandler;