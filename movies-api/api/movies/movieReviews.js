import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// 定义 ReviewsSchema
const ReviewSchema = new Schema({
  movieId: { type: Number, required: true }, 
  userId: { type: String, required: true }, 
  review: { type: String, required: true }, 
  rating: { type: Number, min: 0, max: 10 }, 
  createdAt: { type: Date, default: Date.now } 
});


ReviewSchema.statics.findByMovieId = function (movieId) {
  return this.find({ movieId: movieId });
};

export default mongoose.model('Reviews', ReviewSchema);
