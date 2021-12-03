const { User, Thought } = require("../models");

const userController = {
  // GET /users
  getAllUsers(req, res) {
    User.find({})
      .select("-__v")
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // GET /users/:id
  getUserById({ params }, res) {
    User.findOne({ _id: params.id })
      .populate([
        { path: "thoughts", select: "-__v" },
        { path: "friends", select: "-__v" },
      ])
      .select("-__v")
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
      });
  },

  // POST /users
  createUser({ body }, res) {
    User.create(body)
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.status(400).json(err));
  },

  // UPDATE /users/:id
  updateUser({ params, body }, res) {
    User.findOneAndUpdate({ _id: params.id }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE /users/:id also deletes all of the user's thoughts that are associated with the user
  deleteUser({ params }, res) {
    User.findOneAndDelete({ _id: params.id })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        Thought.deleteMany({ user: dbUserData._id }) //user: dbUserData._id is basically saying that the thought's user id is the same as the user id that is being deleted
          //then it deletes all of the thoughts associated with the user that is being deleted (the user's thoughts)
          .then(() => res.json(dbUserData))
          .catch((err) => res.status(400).json(err));
      })

      .catch((err) => res.status(400).json(err));
  },

  // POST  /api/users/:userId/friends/:friendId
  // add a friendId to a userId friends array
  // add user to friendId friend array
  addFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $push: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        User.findOneAndUpdate(
          { _id: params.friendId },
          { $push: { friends: params.userId } },
          { new: true }
        )
          .then((dbFriendData) => {
            if (!dbFriendData) {
              res.status(404).json({ message: "No user found with this id" });
              return;
            }
            res.json(dbFriendData);
          })
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  },

  // DELETE /api/users/:userId/friends/:friendId
  // remove a friendId from a userId friends array
  // remove user from friendId friend array
  removeFriend({ params }, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "No user found with this id" });
          return;
        }
        User.findOneAndUpdate(
          { _id: params.friendId },
          { $pull: { friends: params.userId } },
          { new: true }
        )
          .then((dbFriendData) => {
            if (!dbFriendData) {
              res.status(404).json({ message: "No user found with this id" });
              return;
            }
            res.json(dbFriendData);
          })
          .catch((err) => res.status(400).json(err));
      })
      .catch((err) => res.status(400).json(err));
  },
};

module.exports = userController;
