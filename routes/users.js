const express = require('express')
const { User, Show } = require('../models/index.js')
const router = express.Router()
const { check, validationResult} = require('express-validator')

// GET/users * Gets all users
// Slash means slash users if we did /users here then it would  bring back users/users
router.get('/', async (req,res) => {
 const users = await User.findAll()
 res.json(users)
})

// GET/users/:userId * Get users 
router.get('/:userId' , async (req, res) => {
    const user = await User.findByPk(req.params.userId) 

    if (!user) { // if no user is found 
        res.status(404).json({ error: 'User not found'}) // give error message of '404 user not found'
        return // this will stop the function from running if the user is not found 
    }
    res.json(user)
})

// GET/users/:userID/shows
router.get('/:userId/shows' , async (req, res) => { // send back an array of all of the shows that user has watched 
    const user = await User.findByPk(req.params.userId) // finding the user by Id

    if (!user) { // if no user is found send back an empty array
        res.json([]) // If we try to get shows for a user that doesnt exist then send back an empty array
        return  // this will stop the function from running if the user is not found 
    }          // If the user is found then we go to the code below
    const shows = await user.getShows() //If the user does exist then we will return the shows that that user has watched
    res.json(shows) // the shows that the user has watched 
       
        
    
    
})

// PUT/users/:userId/shows/:showId
// This will add an already made show to the user once you put in the put request for the movie you want to add to the specific user
// i.e http://localhost:3000/users/1/shows/3 This will add show 3 to the user at Id 1
// i.e http://localhost:3000/users/3/shows/1 this user does not exist so  "error": "Cannot associate a show with a user that does not exist"
router.put('/:userId/shows/:showId', async (req,res) => {
    const user = await User.findByPk(req.params.userId) // not body as we are not creating a new show 

    if(!user) {
        res.status(400).json({error: "Cannot associate a show with a user that does not exist"})
        return
    }

    const show = await Show.findByPk(req.params.showId)

    if(!show) {
        res.status(400).json({error: "Cannot associate a user with a user that does not exist"})
        return
    }
   
    await user.addShow(show)
    res.status(204).send()   // 204 means no content
})

// POST a new user 

router.post('/', [check("username").isEmail().trim()], async (req,res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()) {
        res.json({error: errors.array()});
        return;
    }
   
    const newUser = req.body;

    const createdNewUser = await User.create(newUser);

    res.status(201).json(createdNewUser);
})




module.exports = router // not in curly braces as we are only exporting one thing