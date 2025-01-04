import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';

import {
    getUpcomingMovies,getGenres,getMovie,getMovies
  } from '../tmdb-api';

  
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  
  const movies = await getMovies();
    res.status(200).json(movies);
}));



router.post("/getMovie", asyncHandler(async (req, res) => {
  const { args } = req.body; // Extract args from request body
  try {
  const movie = await getMovie(args);
  res.status(200).json(movie);
  } catch (error) {
  res.status(500).json({
  message: error.message || "Failed to fetch movie.",
  status_code: 500,
  });
  }
  })
);
 //Get movie details
router.get('/movies/:id', asyncHandler(async (req, res) => {
    const id = parseInt(req.params.id);
    const movie = await movieModel.findByMovieDBId(id);
    if (movie) {
        res.status(200).json(movie);
   } else {
        res.status(404).json({message: 'The movie you requested could not be found.', status_code: 404});
    }
 }));
router.get('/tmdb/upcoming', asyncHandler(async (req, res) => {
    const upcomingMovies = await getUpcomingMovies();
    res.status(200).json(upcomingMovies);
}));
router.get('/genres', asyncHandler(async (req, res) => {
    try {
       
        const genres = await getGenres();  
        res.status(200).json(genres);  
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch genres from TMDB', error: error.message });
    }
}));
router.get("/tmdb/popular", async (req, res) => {
  try {
    const movies = await Movie.find().sort({ popularity: -1 }).limit(10);
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch popular movies" });
  }
});
router.get("/users/:userId/favorites", async (req, res) => {
  const { userId } = req.params;
  try {
    // 假设用户数据存储了收藏电影的 ID 列表
    const user = await User.findById(userId);
    const movies = await Movie.find({ _id: { $in: user.favoriteMovies } });
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch favorite movies" });
  }
});

  export default router;