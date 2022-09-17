const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const KBArticle = new Schema({
  title: {
    type: String
  },
  content: {
    type: String
  },
  iconName: {
    type: String
  },
  iconFamily: {
    type: String
  }
});

const KB = mongoose.models.KnowledgeBaseArticle || mongoose.model("KnowledgeBaseArticle", KBArticle);
module.exports = KB;
