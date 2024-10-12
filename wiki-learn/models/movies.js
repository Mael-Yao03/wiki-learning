import mongoose from 'mongoose';

const moviesSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
    unique: true
  },
});

const Movies = mongoose.models.Movies || mongoose.model('Movies', moviesSchema);
export default Movies;
