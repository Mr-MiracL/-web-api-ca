import movieModel from './movieModel';
import asyncHandler from 'express-async-handler';
import express from 'express';
import {
    getUpcomingMovies,getGenres
  } from '../tmdb-api';
  import Reviews from '../models/Reviews.js';
  

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
// create new comments

router.post('/reviews', async (req, res) => {
    try {
      const review = new Reviews(req.body); // 从请求体获取评论数据
      const savedReview = await review.save();
      res.status(201).json(savedReview);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });
  // GET: get users' comments from certain userID
router.get('/reviews/user/:userId', async (req, res) => {
  try {
    const userReviews = await Reviews.find({ userId: req.params.userId });
    res.status(200).json(userReviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  router.get('/reviews/:movieId', async (req, res) => {
    try {
      const reviews = await Reviews.findByMovieId(req.params.movieId);
      res.status(200).json(reviews);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  // PUT: Modify comment content
router.put('/reviews/:id', async (req, res) => {
  try {
    const updatedReview = await Reviews.findByIdAndUpdate(
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
    const deletedReview = await Reviews.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
      return res.status(404).json({ error: 'Review not found' });
    }
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

  export default router;