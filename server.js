// Will do the app.js and server.js all in here 
const express = require('express') // creating an express router 
const usersRouter = require('./routes/users.js')
const showsRouter = require('./routes/shows.js')
const app = express()

//WRITE ROUTES
app.use(express())
app.use('/users', usersRouter)
app.use('/shows', showsRouter)

const port = 3000

app.listen(port,() => {
console.log(`Listening on port ${port}`)
})
