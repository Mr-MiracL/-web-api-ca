import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  movieId: { type: Number, required: true }, 
  userId: { type: String, required: true },  
  review: { type: String, required: true }, 
  
  createdAt: { type: Date, default: Date.now } 
});

export default mongoose.model('Review', ReviewSchema);
