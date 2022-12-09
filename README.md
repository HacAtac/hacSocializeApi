<h1>hacTechBlog application<h1>

<h2>Description</h2>
  <p>Dealing with node, npm packages, mongoDB, mongoose, and express.</br> 
I've made a back end social media Restfull API that utilizes CRUD methods. </br>
 Utilizes virtuals/getters subdocuments and .populate to show and not store data as an object inside of the parent object.</br> 
 Utilizing CRUD methods for User/Thoughts/Reactions/Friends </br> 
 I've also have made it possible to delete the thoughts in a deleted User by using as follows. </br> 
 Thoughts.deleteMany({_id: {$in:dbUserData.thoughts}}) </br>
 This essentially will delete all the thoughts associated with the user that is being deleted by the id.</p> </br>

## Usage

1: Make sure you have MongoDB installed on your machine (if you don't, follow the instructions on the MongoDB Website)</br>
2: Clone the repo </br>
3: Install dependencies with npm -i </br>
4: Run npm start to run the server and make the API live </br>
5: Use your browser or an app like Insomnia to test the REST API. </br>

## Models

<ul>
<li>User</li> </br>
<li>Thoughts</li> </br>
<li>Reactions("SubDocument instead of Thoughts")</li>
</ul>

## Endpoints

User:

Get all users: GET /api/users </br>
Create a user: POST /api/users </br>
Get user by ID: GET /api/users/:id </br>
Update a user: PUT /api/users/:id </br>
Delete a user: DELETE /api/users/:id </br>
Add a friend: PUT /api/users/:userId/friends/:friendId </br>
Delete a friend: DELETE /api/users/:userId/friends/:friendId </br>

Thought:

Get all thoughts: GET /api/thoughts </br>
Create a thought: POST /api/thoughts </br>
Get thought by ID: GET /api/thoughts/:id </br>
Update a thought: PUT /api/thoughts/:id </br>
Delete a thought: DELETE /api/thoughts/:id </br>

Reaction:

Add a reaction: PUT /api/thoughts/:id/reactions </br>
Delete a reaction: DELETE /api/thoughts/:id/reactions/:reactionId </br>

## Language

JavaScript </br>
Node.js </br>
express.js </br>
mongoDB </br>
mongoose </br>
react(future development)</br>

## Contributing

If you'd like to contribute to this SocializeApi you can fork or clone this repo and have at it! </br>

## User Story

AS A social media startup </br>
I WANT an API for my social network that uses a NoSQL database </br>
SO THAT my website can handle large amounts of unstructured data </br>

GIVEN a social network API </br>
WHEN I enter the command to invoke the application </br>
THEN my server is started and the Mongoose models are synced to the MongoDB database </br>
WHEN I open API GET routes in Insomnia for users and thoughts </br>
THEN the data for each of these routes is displayed in a formatted JSON </br>
WHEN I test API POST, PUT, and DELETE routes in Insomnia</br>
THEN I am able to successfully create, update, and delete users and thoughts in my database </br>
WHEN I test API POST and DELETE routes in Insomnia </br>
THEN I am able to successfully create and delete reactions to thoughts and add and remove friends to a user’s friend list </br>

## Author

Greetings! <('.') , >('.')> </br> 
My name is Jordan Hackworth and I hope that this can help clear up any questions you may have. </br> 
If you have any questions or comments please feel free to contact me. </br>

Jordan Hackworth aka HacAtac </br>
GitHub repo: https://github.com/HacAtac/hacSocializeApi </br>
LinkedIn: https://www.linkedin.com/in/jordan-hackworth-898205217/ </br>
E-mail: jhack00@icloud.com </br>

<a href ="https://github.com/HacAtac/hacSocializeApi" target="_blank">Link to my git hub application.</a></br>
<a href ="https://watch.screencastify.com/v/1XPrJoWHBba2pWEHvBQ4" target="_blank">Link to my video-walkthrough!</a>

<h3>Screenshot of app!</h3>

![image](https://user-images.githubusercontent.com/87215152/145312345-3b64c2c7-3f6d-4518-ae5a-af6ba3ce6d29.png)



