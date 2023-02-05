const express = require('express')
const app = express()
const crypto = require('crypto')

const database = []

app.use(express.json())

app.post("/tasks", (req, res) => {
    const { title, description, } = req.body
    const date = new Date()

    const data = {
        id: crypto.randomUUID(),
        title,
        description,
        completed_at: null,
        created_at: (`${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`),
        updated_at: null
    }

    database.push(data)

    console.log(database)
    return res.status(200).send("Tarefa Registrada!")

})

app.get("/tasks", (req, res) => {
    return res.status(200).send(database)
})


app.listen(5000, () => {
    console.log("Server Running")
})