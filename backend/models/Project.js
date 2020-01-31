const mongoose = require("mongoose");

const ProjectSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  tasks: [
    {
      description: {
        type: String,
        required: true
      },
      completed: {
        type: Boolean,
        default: false
      },
      creation_date: {
        type: Date,
        default: Date.now
      },
      finish_date: {
        type: Date
      }
    }
  ],
  creation_date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Project = mongoose.model("project", ProjectSchema);
