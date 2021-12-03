const { Schema, model } = require("mongoose"); //importing mongoose to use it in this file for our database
//
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      //regex for matching email format
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, //regex for matching email format
        "Please fill a valid email address", //error message
      ],
    },
    //array of thoughts that the user has posted on the website/database (thoughts are stored in the database)
    thoughts: [{ type: Schema.Types.ObjectId, ref: "Thought" }],
    //array of friends for the user (friends are stored in the database)
    friends: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },

  //this will show virtuals in the response (virtuals are not stored in the database
  //and id is not shown in the response (id is stored in the database) id: false will not show id in the response
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);
//where is friendCount coming from?
//its coming from the virtuals property in the schema above
//virtuals are properties that are not stored in the database
//but are computed on the fly
//virtuals are useful for displaying data in the front end also for things like counting friends :p
UserSchema.virtural("friendCount").get(function () {
  return this.friends.length;
});

const User = model("User", UserSchema);

module.exports = User;
