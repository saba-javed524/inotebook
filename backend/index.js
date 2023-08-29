//Entry point =>
const connectToMongo = require('./db');
const express = require('express')

connectToMongo(); //connecting to mongo

const app = express()
const port = 5000

app.use(express.json())

//Available Routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.get('/', (req, res) => {
    res.send('Hello Saba we connected!')
})

app.listen(port, () => {
    console.log(`iNoteBook app listening on port http://localhost:${port}`)
})