const express = require('express')
const bodyParser = require('body-parser')
const MongoClient = require('mongodb').MongoClient
const app = express()


MongoClient.connect('mongodb+srv://angelsoto9597:demo@cluster0.cjblk3u.mongodb.net/?retryWrites=true&w=majority', { useUnifiedTopology: true, })
    .then(client => {
        console.log('connected to DataBase')
        const db = client.db('personal-express')
        const vinCollection = db.collection('models')
        app.set('view engine', 'ejs')
        app.use(bodyParser.urlencoded({ extended: true }))
        app.use(express.static('public'))
        app.use(bodyParser.json())

        app.listen(3500, function () {
            console.log('hello world!')
        })
        app.get('/', (req, res) => {
            db.collection('models').find().toArray()
                .then(result => {
                    res.render('index.ejs', { models: result })
                })
                .catch(error => console.error(error))

        })
        

        app.post('/models', (req, res) => {
            vinCollection.insertOne(req.body)
                .then(result => {
                    res.redirect('/')
                    console.log(result)
                })
        })
        app.put('/models', (req, res) => {
            vinCollection.findOneAndUpdate({ cars: req.body.cars, model:req.body.model  },
                {

                    $set: {
                        cars: req.body.cars,
                        model: req.body.model,
                    },
                },
                options
            )
                .then(result => {
                    console.log(result)
                })
                .catch(error => console.error(error))
        })


        app.delete('/models', (req, res) => {
            console.log(req.body)
            vinCollection.findOneAndDelete({ cars: req.body.cars, model:req.body.model })
                .then(result => {
                    if(result.deletedCount === 0){
                        return res.json('Please add a car to the list.')
                    }
                    res.json('Sent That Car to the Junkyard!!')
                })
                .catch(error => console.error(error))
        })
           

    })

