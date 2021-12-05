const { User } = require("../models");

const userController = {
  //get all users
  getAllUsers(req, res) {
    User.find({})
      //im still confused on the whole .populate thing // also confused on virtuals/getters
      //.populate method basically allows you to populate or in other words,
      //get the data from another table and then display it on the current table
      //very similar to the join method in sql
      //path: "thoughts" is the name of the virtual getter in the user model
      .populate({
        path: "thoughts",
        select: "-__v", //this will exclude the virtual getter from the response its basically saying dont send the virtual getter or in other words dont send the __v
      })
      .select("-__v")
      .sort({ _id: -1 }) //this will sort the data in descending order by id so that the newest data is displayed first
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err); //this will send a 400 error to the client if there is an error
      });
  },
  // get one user by id
  getUserById({ params }, res) {
    //params is the object that is passed in from the route and it is the id of the user
    User.findOne({ _id: params.id })
      .populate({
        path: "thoughts",
        select: "-__v",
      })
      .select("-__v")
      .then((dbUserData) => {
        // If no user is found
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },
  // create user
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },
  // update user by id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  // delete user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "no user found with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // add friend
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $addToSet: { friends: params.friendsId } }, //params here is the id of the user and the friendsId is the id of the friend
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.id },
      { $pull: { friends: params.friendsId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "no user found with this ID" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
