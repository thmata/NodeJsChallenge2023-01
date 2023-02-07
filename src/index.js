const express = require('express')
const app = express()
const crypto = require('crypto')

const database = []

app.use(express.json())

// Adicionar Tasks
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

    return res.status(200).send("Tarefa Registrada!")

})

// Listar todas as Tasks
app.get("/tasks", (req, res) => {
    return res.status(200).send(database)
})

app.put("/tasks/:id", (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
    const date = new Date()

    const tasks = database.find(data => {
        return data.id === id
    })

    console.log(title, description, tasks)


    if(!tasks){
        return res.status(404).send("Usuário não encontrado")
    }

    const newTask = database.map(data => {
        if(data.id === id){
            data.title = title
            data.description = description
            data.updated_at = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
        }
        return data
    }) 

    res.status(200).send("Usuário alterado.")
    
})




app.listen(5000, () => {
    console.log("Server Running")
})