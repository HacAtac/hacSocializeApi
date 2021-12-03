const { Thoughts, User } = require("../models");

const ThoughtController = {
  // GET /thoughts
  getAllThoughts(req, res) {
    //making a function named getAllThoughts that will get all the thoughts from the database
    Thoughts.findAll({}) //this will find all the thoughts in the database and store it in an array called thoughts
      //will return an array of all the thoughts in the database
      .populate({
        //this will populate the user id from the thoughts table with the user table and store it in an array called user
        //.populate is a monogoose method similar to sequelize join methods or relations
        path: "reactions", //this is the name of the column in the thoughts table that we want to populate
        select: "-__v", //this is the name of the column in the user table that we want to populate
      })
      //will return the thoughts array and the user array
      .populate({
        //basically means that we want to select all the columns in the thoughts table except the __v column
        path: "thoughts",
        select: "-__v",
      })
      .then((dbThoughtData) => res.json(dbThoughtData)) //this will return the thoughts array and the user array
      .catch((err) => {
        //this will catch any errors that may occur
        res.status(400).json(err); //this will return a status code of 400 and the error message in json format to the client
      });
  },

  // get one thought by it's id
  getThoughtByid({ params }, res) {
    Thoughts.findOne({ _id: params.id }) //this will find the thought in the database with the id that is passed in the url
      .then((dbThoughtData) => {
        //then will return the thought data
        if (!dbThoughtData) {
          // if the thought data is not found
          res.status(404).json({ message: "No thought found with this id" }); //this will return a status code of 404 and the error message in json format to the client
          return; //returns to the catch block below and does not execute the next line
        }
        res.json(dbThoughtData); //this will return the thought data in json format to the client if all goes well
      })
      .catch((err) => res.status(400).json(err)); //this will catch any errors that may occur
  },

  //create thought to a user
  createThought({ params }, res) {
    //this will create a thought to a user with the id that is passed in the url
    Thoughts.create(body) // were then creating a thought with the body that is passed in the request
      .then((thoughtData) => {
        //this will return the thought data to the client if all goes well
        return User.findOneAndUpdate(
          //this is a mongoose method that will find the user with the id that is passed in the url and update the user with the thought id
          { _id: body.userId }, //this is the id of the user that is passed in the request
          //$push is a mongoose method that will push the thought id to the user's thoughts array
          { $push: { thoughts: thoughtData._id } }, //this is the thought id that is passed in the request
          { new: true } //this is a mongoose method that will return the updated user data
        );
      })
      .then((dbUserData) => {
        //if all goes well this will return the user data to the client
        if (!dbUserData) {
          //if the user data is not found then this will return a status code of 404 and the error message in json format to the client
          res.status(404).json({ message: "No user found with this id" });
          return; //returns to the catch block below and does not execute the next line
        }
        res.json(dbUserData); //this will return the user data in json format to the client if all goes well
      })
      .catch((err) => res.status(400).json(err)); //this will catch any errors that may occur
  },

  //update thought by id
  //basically making a function named updateThought that will update a thought in the database
  updateThought({ params, body }, res) {
    //this will update a thought with the id that is passed in the url and the body that is passed in the request body (the updated thought)
    Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbThoughtData) => {
        //this will return the thought data to the client if all goes well
        if (!dbThoughtData) {
          //if the thought data is not found then this will return a status code of 404 and the error message in json format to the client
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThoughtData); // this will return the thought data in json format to the client if all goes well
      })
      .catch((err) => res.status(400).json(err));
  },

  //delete thought by id
  //basically making a function named deleteThought that will delete a thought in the database
  deleteThought({ params }, res) {
    //params here is the id that is passed in the url
    Thoughts.findOneAndDelete({ _id: params.id }) //this will find the thought in the database with the id that is passed in the url
      .then((dbThoughtData) => {
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return;
        }
        res.json(dbThoughtData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // add reaction to a thought
  //basically making a function named addReaction that will add a reaction to a thought in the database and will return the thought data to the client if all goes well
  addReaction({ params, body }, res) {
    //params here is the id that is passed in the url //body here is the reaction that is passed in the request body
    Thoughts.findOneAndUpdate(
      //this is a mongoose method that will find the thought with the id that is passed in the url and update the thought with the reaction
      { _id: params.id.thoughtId }, //this is the id of the thought that is passed in the url
      { $addToSet: { reactions: body } }, //this is the reaction that is passed in the request body and will add it to the thought's reactions array
      { new: true } // this is a mongoose method that will return the updated thought data to the client
    )
      .then((dbThoughtData) => {
        //this will return the thought data to the client if all goes well
        if (!dbThoughtData) {
          res.status(404).json({ message: "No thought found with this id" });
          return; //returns to the catch block below and does not execute the next line
        }
        res.json(dbThoughtData); //this will return the thought data in json format to the client if all goes well
      })
      .catch((err) => res.status(400).json(err));
  },

  // remove reaction from a thought
  // bascially making a function named removeReaction that will remove a reaction from a thought in the database and will return the thought data to the client if all goes well
  removeReaction({ params }, res) {
    //params here is the id that is passed in the url res here is the response that is passed in the request body
    Thoughts.findOneAndUpdate(
      //
      { _id: params.thoughtId }, //this is the id of the thought that is passed in the url
      { $pull: { reactions: { _id: params.reactionId } } }, // this is a mongoose method that will remove the reaction from the thought's reactions array
      { new: true }
    )
      .then((dbThoughtData) => res.json(dbThoughtData)) //this will return the thought data to the client if all goes well
      .catch((err) => res.status(400).json(err)); //this will catch any errors that may occur
  },
};

module.export = ThoughtController; //this exports the ThoughtController
