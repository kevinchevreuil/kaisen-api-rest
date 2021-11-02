const express = require("express")
const mongoose = require("mongoose")
const app = express()
const port = 4000
const db = "mongodb://mongo:27017/alterway"
const Schema = mongoose.Schema
app.listen(port, () => console.log(`This app use the port ${port}.`))
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => console.log('Successfully connected to Alterway database.'))

const teamSchema = new Schema({ 
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 18,
        max: 70,
        required: true
    }, 
})

const awccmembers = mongoose.model("awccmembers", teamSchema)

app.get('/api/team', function (req, res) {
    awccmembers.find({}, (error, team) => {
        if (error) {
            res.status(400).error(error)
            return
        }
        res.status(200).send({
            response: team
        })
    })
})

app.get('/api/team/:id'), function (req, res) {
    const id = req.params.id
    awccmembers.findById(id, (error, team) => {
        if (error || !team) {
            res.status(400).send({
                error: true,
                message: "Member not found"
            })
        } else {
            res.status(200).send({
                response: team
            })
        }
    })
}

app.post('/api/team/add', function(req, res) {
    const post = new awccmembers({
        name: "Cyril Becker",
        age: "36"
    })
    post.save(error => {
        if(error) {
            res.status(400).send({
                error: `error adding new member ${error}`
            })
            return
        }
        res.status(200).send(`Member successfully added.`)
    })
})

app.get('/health', (req, res) => {
    const db = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
  
    res.status(200).send(data);
});