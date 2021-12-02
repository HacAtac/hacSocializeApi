const { Schema, model } = require("mongoose"); //importing mongoose to use it in this file for our database
const dateFormat = require("../utils/dateFormat"); //importing dateFormat from utils folder

// this is the schema for the thoughts collection
const ThoughtSchema = new Schema(
  {
    thoughtName: {
      type: String, // This makes sure that the name is a string
      required: "You need to provide a thought name!", //setting an actual error message
      trim: true, //trim will remove all the white spaces from the beginning and end of the string
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

  // getters are used to format the date
  // virtuals are used for the comments array in the thought object
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
  }
);

//this virtual is used to get the number of comments for a thought in the thought list page
//so that it can be displayed in the thought list page or in our case the db
ThoughtSchema.virtual("commentsCount").get(function () {
  return this.comments.reduce(
    (total, comment) => total + comment.replies.length,
    +1, // +1 for the comment itself so that it is counted as a reply to itself too (the first comment) and not as a reply to no one
    0 // this is the initial value of the reduce function (the first value of the array) so that the first comment is counted as a reply to itself
  );
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
