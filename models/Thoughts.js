const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ThoughtSchema = new Schema(
  {
    thoughtName: {
      type: String,
      required: "You need to provide a thought name!",
      trim: true,
    },
    createdBy: {
      type: String,
      required: "You need to provide a thought creator!",
      trim: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    thoughts: [],
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

ThoughtsSchema.virtual("commentsCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length,
    +1,
    0
  );
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
