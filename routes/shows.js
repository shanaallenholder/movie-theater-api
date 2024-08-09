const express = require('express')
const { User, Show } = require('../models/index.js')
const router = express.Router()

// GET all shows * Get/shows
router.get("/" , async (req,res) => {
    const shows = await Show.findAll()
    res.json(shows)
})



// GET one Show by show Id  * Get/shows/:showId
router.get("/:showId" , async (req,res) => {
    const show = await Show.findByPk(req.params.showId) // show not shows as we are only finding one so it makes more sense to do show not shows 

    if (!show) {
        res.status(404).json({error: "Show not found"})
        return
    }
    res.json(show)


})

//GET all users that have watched the show with that specific show Id
router.get("/:showId/users" , async (req,res) => {
    const show = await Show.findByPk(req.params.showId) // show not shows as we are only finding one so it makes more sense to do show not shows 

    if (!show) {
       res.json([])
       return
    }

    const users = await show.getUsers()
    res.json(users)


})


// PATCH update the available * PUT/shows/:showId 
// Patch will partially update one thing in the show rather than a PUT request which will change the whole thing 
// {"available": true or false }
router.patch("/shows/:showId", async (req,res) => {
    const show = await Show.findByPk(req.body.showId)

    if(!show) {
        res.json([])
        return
    }

    
})

// DELETE a show * Delete/shows/:showId


// GET shows of a particular genre (genre in `req.query`)
// GET /shows?genre=
// query params

    module.exports = router

