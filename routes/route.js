const { render } = require('ejs')
const express = require('express')
const router = express.Router()
const multer = require('multer')
const userdata = require('../models/user')
router.get('', (req, res) => {
    res.render('login')
})

router.get('/insert', (req, res) => {
    res.render('insert')
})
router.get('/loginsubmit', async(req, res) => {
    const { email } = req.query
    var response = await userdata.findOne({ email: email })
    if (!response) {
        console.log('invaild data')
    } else {
        userdata.find((err, data) => {
            res.render('display', {
                user: data
            })
        })
    }
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '' + Date.now() + '' + file.originalname)
    }
})
const upload = multer({
    storage: storage
}).single('image')

router.post('/submitinsert', upload, (req, res) => {
    const user = new userdata({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        image: req.file.filename,
    })
    user.save((err) => {
        if (err) {
            console.log(err)
        } else {
            res.render('login')
        }
    })
})

router.get('/display', (req, res) => {
    userdata.find((err, data) => {
        res.render('display', {
            user: data
        })
    })
})
module.exports = router