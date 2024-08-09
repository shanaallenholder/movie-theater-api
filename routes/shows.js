const express = require('express')
const { User, Show } = require('../models/index.js')
const router = express.Router()

// GET all shows * Get/shows
// GET shows of a particular genre (genre in `req.query`)
// GET /shows?genre=
// query params

router.get("/" , async (req,res) => {
    
    const queryString = req.query

    if(queryString.genre){
        const allShowsForThisQuery = await Show.findAll({
            where: {genre: queryString.genre},
        });
        res.status(200).send(allShowsForThisQuery);
        return;
    }
    const allShows = await Show.findAll()
    res.status(200).send(allShows)
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
   router.patch("/:showId", async (req,res) => {
    let show = await Show.findByPk(req.params.showId)

    if(!show) {
        res.status(404).send({error: "Show does not exist" })
        return
    }
    const showUpdate = req.body;
    show = await show.update(showUpdate)
    res.send(show);

    
})

// DELETE a show * Delete/shows/:showId
router.delete("/:showId", async(req,res) => {
    const show = await Show.findByPk(req.params.showId)
    await show.destroy();
    res.json(show)
})


    module.exports = router

