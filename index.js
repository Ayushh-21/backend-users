const express = require("express");
require('dotenv').config()
const cors = require("cors")
const app = express();
const sequelize = require('./lib/sequelize')
const userModel = require('./models/user')

app.use(cors())
app.use(express.json())

sequelize
    .sync()
    .then(() => {
        console.log("Database connected and synced")
    }).catch((error) => {
        console.log("Unable to connect to database", error)
    })

app.get('/users', async (req, res) => {
    try {
        const user = await userModel.findAll()
        res.json({user})

    } catch (error) {
        res.status(500).json({ error: "Failed to fetch users." })
    }
})


app.get('/users/:id', async (req, res) => {
    let userId = parseInt(req.params.id)
    try {
        const user = await userModel.findByPk(userId)
        if (user) {
            res.json({user})
        }
        else {
            res.status(404).json({ message: "user not found." })
        }
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch user." })
    }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})


