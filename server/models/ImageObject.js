const mongoose = require('mongoose')

const instance = new mongoose.Schema(
  {
    imageLink: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
    },
    category: {
      type: String,
      required: true,
    },
    user: {
      type: String,
      required: true,
    }
  },
  {
    timestamps: true,
  },
)

const modelName = 'ImageObject'

module.exports = mongoose.model(modelName, instance)
