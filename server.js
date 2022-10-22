const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/product")
const db = mongoose.connection
db.on('error', (error) => {
        console.log(error)
    }),
    db.once('open', () => {
        console.log('connected to db')
    })

app.use(express.static('uploads'))
app.set('view engine', 'ejs')
app.use('', require('./routes/route'))

app.listen(7000, (req, res) => {
    console.log('listening at port 8000')
})