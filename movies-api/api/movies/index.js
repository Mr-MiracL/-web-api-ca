import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,getGenres,getMovieReviews,getMovies,getMovie
  } from '../tmdb-api';
import movieReviews from './movieReviews.js';
  
const router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
    let { page = 1, limit = 10 } = req.query; // destructure page and limit and set default values
    [page, limit] = [+page, +limit]; //trick to convert to numeric (req.query will contain string values)

    // Parallel execution of counting movies and getting movies using movieModel
    const [total_results, results] = await Promise.all([
        movieModel.estimatedDocumentCount(),
        movieModel.find().limit(limit).skip((page - 1) * limit)
    ]);
    const total_pages = Math.ceil(total_results / limit); //Calculate total number of pages (= total No Docs/Number of docs per page) 

    //construct return Object and insert into response object
    const returnObject = {
        page,
        total_pages,
        total_results,
        results
    };
    res.status(200).json(returnObject);
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
// Get movie details
router.get('/:id', asyncHandler(async (req, res) => {
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
router.get('/tmdb/genres', asyncHandler(async (req, res) => {
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
// create new comments
router.post('/reviews', async (req, res) => {
    try {
      const review = new movieReviews(req.body); 
      const savedReview = await review.save();
      res.status(201).json(savedReview);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  // GET: get users' comments from certain userID
router.get('/reviews/user/:userId', async (req, res) => {
  try {
    const userReviews = await movieReviews.find({ userId: req.params.userId });
    res.status(200).json(userReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  router.get('/reviews/:movieId', async (req, res) => {
    try {
      const reviews = await movieReviews.findByMovieId(req.params.movieId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  // PUT: Modify comment content
router.put('/reviews/:id', async (req, res) => {
  try {
    const updatedReview = await movieReviews.findByIdAndUpdate(
      req.params.id, 
      req.body, 
      { new: true } 
    );
    if (!updatedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json(updatedReview);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
// DELETE: delete comments
router.delete('/reviews/:id', async (req, res) => {
  try {
    const deletedReview = await movieReviews.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  export default router;