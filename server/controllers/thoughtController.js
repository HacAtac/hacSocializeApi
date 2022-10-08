const { Thoughts, User } = require("../models");
//controller for the thoughts database document
const thoughtController = {
  // get all thoughts
  getAllThoughts(req, res) {
    Thoughts.find({}) //mongoose method to find all thoughts in the database
      .populate({
        //populate the user id with the user document
        //populate the reactions array with the reactions and put it in the reactions property of the thought object
        path: "reactions",
        //populate will only return the reactions array
        select: "-__v", //select the reactions array but not the __v property
      })
      .populate({
        //populate the user id with the user document
        //populate the thoughts array with the thoughts and put it in the thoughts property of the user object
        path: "thoughts",
        //select the thoughts array but not the __v property
        select: "-__v",
      })
      //.select will only return the thoughts array but not the __v property
      //and the user id will be populated with the user document
      //and the reactions array will be populated with the reactions and put it in the reactions property of the thought object
      //and the thoughts array will be populated with the thoughts and put it in the thoughts property of the user object
      .select("-__v") //select the thoughts array but not the __v property
      .then((dbThoughtData) => res.json(dbThoughtData)) //return the thoughts array in the json format to the client side or database
      .catch((err) => {
        //if there is an error in the database then return the error to the client side or database
        console.log(err); //log the error to the console
        res.status(400).json(err); //return the error to the client side or database
      });
  },
  // get one thought by it's id
  getThoughtById({ params }, res) {
    //destructuring the params object which is the id of the thought to get the id
    Thoughts.findOne({ _id: params.id }) //then find the thought in the database by the id of the thought
      .then((dbThoughtData) => {
        //then return the thought in the json format to the client side or database

        if (!dbThoughtData) {
          //if no thought is found then return the error to the client side or database
          res.status(404).json({ message: "No thought with this ID" }); //
          return; //return; will stop the function from running further so that the error is not returned to the client side or database twice
        }
        res.json(dbThoughtData); //return the thought in the json format to the client side or database
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create thought to a user
  createThought({ body }, res) {
    //destructuring the body object which basically is the thought object which is the thought to be created by the user in the database
    console.log(body); //log the body object to the console to see what is being sent to the database
    Thoughts.create(body) //create the thought in the database using the destructured body object which is the thought to be created by the user
      .then((thoughtData) => {
        //then return the thought in the json format to the client side or database
        return User.findOneAndUpdate(
          //return User.findOneAndUpdate basically finds the user in the database by the id of the user and then updates the thoughts array of the user document with the thought id
          { _id: body.userId }, //find the user in the database by the id of the user
          { $push: { thoughts: thoughtData._id } }, //push the thought id to the thoughts array of the user document
          { new: true } //basically will ensure that the new user document is returned to the client side or database instead of the old user document
        );
      })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No User with this ID" });
          return;
        }
        res.json(dbUserData); //if all goes well then return the user in the json format to the client side or database
      })
      .catch((err) => res.json(err));
  },
  //update thought by it's id
  updateThought({ params, body }, res) {
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true }) //_id: params.id is the id of the thought to be updated and body is the updated thought object which is the thought to be updated
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this ID" });
          return;
        }
        res.json(dbThoughtData); //if all goes well then return the thought in the json format to the client side or database
      })
      .catch((err) => res.status(400).json(err));
  },
  // delete a thought
  deleteThought({ params }, res) {
    //destructuring the params object which is the id of the thought to be deleted
    //then delete the thought in the database by the id of the thought
    //then return the thought in the json format to the client side or database
    //if there is an error in the database then return the error to the client side or database
    //if there is no thought with this id then return the error to the client side or database
    // if all goes well then return the thought in the json format to the client side or database
    Thoughts.findOneAndDelete({ _id: params.id }) //destructuring the params object which is the id of the thought to be deleted // _id is the unique id of the thought //and params.id is the id of the thought to be deleted
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this ID" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // add Reaction
  addReaction({ params, body }, res) {
    //params are basically ids of whatever the user is reacting to and body is the reaction object which is the reaction to be added to the database
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId }, //what is being reacted to is the thought id
      { $addToSet: { reactions: body } }, // $addToSet is a mongoose method which adds the reaction to the reactions array of the thought document
      { new: true } //ensures that the new thought document is new and not the old thought document
    )
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.json(err));
  },

  //delete Reaction
  deleteReaction({ params }, res) {
    console.log(params);
    Thoughts.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData))
      .catch((err) => res.json(err));
  },
};

module.exports = thoughtController;
