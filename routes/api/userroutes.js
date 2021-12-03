const router = require("express").Router();

const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/usercontroller");

//router for / methods
router
  .route("/") // http://localhost:5000/api/users (GET)
  .get(getAllUsers) // GET http://localhost:5000/api/users
  .post(createUser); // POST http://localhost:5000/api/users

//router for /:id methods
router
  .route("/:id") // http://localhost:5000/api/users/:id (GET, PUT, DELETE)
  .get(getUserById) // GET http://localhost:5000/api/users/:id (GET)
  .put(updateUser) // PUT http://localhost:5000/api/users/:id (PUT)
  .delete(deleteUser); // DELETE http://localhost:5000/api/users/:id (DELETE)

// router.route("/:id/friends")
// https://localhost:5000/api/users/:id/friends
// https://localhost:5000/api/users/:id/friends/:friendId
router.route("/:id/friends/:friendsId").post(addFriend).delete(removeFriend);

module.exports = router;
