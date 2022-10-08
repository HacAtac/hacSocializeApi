const { Schema, model, Types } = require("mongoose");
const dateFormat = require("../utils/dateFormat");

const ReactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId, //this will be the id of the user who reacted
      default: () => new Types.ObjectId(), //default value for the id
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280,
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
    //toJSON is basically a method that converts the object to a json object
    toJSON: {
      //this will remove the __v and _id from the response
      getters: true,
    },
  }
);

const ThoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    //what were doing here is that we are creating a new array of reactions and we are adding the reaction schema to it so that we can add the reactions to the thought document
    //or in better words we are adding the reaction schema to the thought document
    //is schema the same as document? yes
    reactions: [ReactionSchema],
  },
  {
    toJSON: {
      virtuals: true, //this will add the virtuals to the response
      getters: true, //this will add the getters to the response
    },
    id: false, //this will remove the id from the response
  }
);

// get total count of reactions and replies on retrieval
// this is a virtual field that will be added to the response of the thought document
// and it will be called by the getter function which is defined in the schema
//virtuals are not stored in the database and are only added to the response which basically means that we are adding the virtuals to the response of the thought document
//what is the response of the thought document? the thought document is the response of the get request or post request put request or delete request
ThoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

const Thoughts = model("Thoughts", ThoughtSchema); //this is the model that we are exporting from this file and this is the name of the model

module.exports = Thoughts;
