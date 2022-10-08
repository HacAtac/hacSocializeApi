const { Schema, model } = require("mongoose");

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
      unique: true,
      required: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // this is a regular expression or regex that checks if the email is valid
        "Please enter a valid email address",
      ],
    },
    thoughts: [
      // we are going to store the thoughts in an array of objects so that we can store multiple thoughts
      // this makes it easier to search for a specific thought etc...
      //we could have used a string but this is more flexible and allows us to store more data
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts", //referencing the model name in the database (Thought)
      },
    ],
    // same thing here as above but for friends basically this is an array of objects or in mongoose terms an array of ids/subdocuments
    friends: [
      {
        type: Schema.Types.ObjectId, //we are storing the id of the friend in the database so that we can find the friend in the database
        ref: "User", //referencing the model name in the database (User) so that we can find the friend in the database using the id
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
    },
    id: false,
  }
);

//the below virtual are used to get friend count so that we can display it on our json response or user object but it is not stored in the database
UserSchema.virtual("friendCount").get(function () {
  //this is a virtual so that we can get the friend count from the database and not from the user object
  return this.friends.length; //this will print the friend count from the database or in lack of better words the friend count from the user object
});

// create the user model using userSchema
const User = model("User", UserSchema);

// export the model
module.exports = User;
