import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
  id: {
    type: Number
  },
  headline: {
    type: String
  },
  summary: {
    type: String
  },
  link: {
    type: String
  },
  date: {
    type: String
  },
  time: {
    type: String
  },
  category: {
    type: String
  },
  source: {
    type: String
  },
  image: {
    type: String
  }
});

const News = mongoose.models.News || mongoose.model('News', NewsSchema);
module.exports = News;
