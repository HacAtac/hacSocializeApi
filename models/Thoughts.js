const { Schema, model, Types } = require("mongoose"); //require mongoose + Types for ObjectId
const dateFormat = require("../utils/dateFormat"); //importing dateFormat from utils folder

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId(), //Types.ObjectId() basically generates a new ObjectId for every new Reaction
    },

    reactionBody: {
      type: String,
      required: true,
      min: 1,
      mac: 280,
    },

    username: {
      type: String,
      required: true,
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

// this is the schema for the thoughts collection
const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String, // This makes sure that the name is a string
      required: "You need to provide a thought name!", // This sets an acutal error message instead of the default one
      minlength: 1, //must be between 3 and 100 characters
      maxlength: 280,
      trim: true, //trim will remove all the white spaces from the beginning and end of the string
    },

    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },

    username: {
      type: String,
      required: "You need to provide a thought username!",
    },
    reactions: [ReactionSchema],
  },
  // getters are used to format the date
  // virtuals are used for the comments array in the thought object
  {
    toJSON: {
      getters: true,
      virtuals: true,
    },
    id: false,
  }
);

//this virtual is used to get the number of comments for a thought in the thought list page
//and stores it as reactionCount in the thought object
//so that it can be displayed in the thought list page or in our case the db
// then returns the length of reactions array in the thought object subdocument object
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thought = model("Thought", ThoughtSchema);

module.exports = Thought;
