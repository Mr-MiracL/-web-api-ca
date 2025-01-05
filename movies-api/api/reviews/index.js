import express from 'express';
import Review from '../models/reviewModel.js';
import asyncHandler from 'express-async-handler';

const router = express.Router();

// 获取某个电影的所有评论
router.get('/:movieId', asyncHandler(async (req, res) => {
  const { movieId } = req.params;
  const reviews = await Review.find({ movieId });
  res.status(200).json(reviews);
}));

// 添加一条新的评论
router.post('/', asyncHandler(async (req, res) => {
  const { movieId, userId, review, rating } = req.body;

  if (!movieId || !userId || !review || rating == null) {
    res.status(400).json({ error: 'All fields are required' });
    return;
  }

  const newReview = new Review({ movieId, userId, review, rating });
  await newReview.save();
  res.status(201).json(newReview);
}));

// 更新评论
router.put('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { review, rating } = req.body;

  const updatedReview = await Review.findByIdAndUpdate(
    id,
    { review, rating },
    { new: true }
  );

  if (!updatedReview) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }

  res.status(200).json(updatedReview);
}));

// 删除评论
router.delete('/:id', asyncHandler(async (req, res) => {
  const { id } = req.params;

  const deletedReview = await Review.findByIdAndDelete(id);

  if (!deletedReview) {
    res.status(404).json({ error: 'Review not found' });
    return;
  }

  res.status(200).json({ message: 'Review deleted successfully' });
}));

export default router;
