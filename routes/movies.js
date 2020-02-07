const express = require('express');
const MoviesServices = require('../services/movies');

function moviesApi(app) {

  const router = express.Router();
  app.use('/api/movies', router);

  const moviesServices = new MoviesServices();

  router.get('/', async function(req, res, next) {
    try {
      
      const {tags} = req.query;
      const movies = await moviesServices.getMovies({tags});
      
      res.status(200).json({
        data: movies,
        message: 'peliculas listadas'
      });
    } catch (err) {
      next(err);
    }
  });

  router.get('/:movieId', async function(req, res, next) {
    try {
      const {movieId} = req.params;
      const movie = await moviesServices.getMovie({movieId});
      res.status(200).json({
        data: movie,
        message: 'pelicula listada'
      });
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async function(req, res, next) {
    try {
      const {body:movie} = req;
      const createMovieId = await moviesServices.createMovie({movie});
      res.status(201).json({
        data: createMovieId,
        message: 'pelicula creada'
      });
    } catch (err) {
      next(err);
    }
  });

  router.put('/:movieId', async function(req, res, next) {
    try {
      const {movieId} = req.params;
      const {body:movie} = req;
      const updateMovieId = await moviesServices.updateMovie({movie,movieId});
      res.status(200).json({
        data: updateMovieId,
        message: 'pelicula actualizada'
      });
    } catch (err) {
      next(err);
    }
  });

  router.delete('/:movieId', async function(req, res, next) {
    try {
      const {movieId} = req.params;
      const deleteMovieId = await moviesServices.deleteMovie({movieId});
      res.status(200).json({
        data: deleteMovieId,
        message: 'peliculas eliminada'
      });
    } catch (err) {
      next(err);
    }
  });

  router.patch('/:movieId', async function (req,res,next){
    try{
      
      const {movieId} = req.params;
      const {body:movie} = req;
      const updateTitle = await moviesServices.patchMovieUpdateTitle({movieId,movie});
      res.status(200).json({
        data: updateTitle,
        message: 'titulo modificado'
      });
    }catch(err){
      next(err);
    }
  });

}

module.exports = moviesApi;
