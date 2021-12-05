const router = require("express").Router();

const {
  //setting up routes this way allows us to use the same routes for different controllers and still have them all in one file
  //importing the controller after calling different functions from it to use in the routes below and storing them in a variable
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thoughtcontroller");

// Set up GET all and POST at /api/thoughts
router.route("/").get(getAllThoughts).post(createThought);
//to post a thought do a post request to /api/thoughts and send the body of the request
// Set up GET one, PUT, and DELETE at /api/thoughts/:id
router
  .route("/:id")
  .get(getThoughtById)
  .put(updateThought)
  .delete(deleteThought);

router
  .route("/:thoughtId/reactions") //to add a reaction to a thought do a post request to /api/thoughts/:thoughtId/reactions and send the body of the request
  .post(addReaction)
  .delete(deleteReaction);

module.exports = router;
