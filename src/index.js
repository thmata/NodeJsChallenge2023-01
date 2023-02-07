const express = require('express')
const app = express()
const crypto = require('crypto')

const database = []

app.use(express.json())

// ADICIONANDO NOVA ATIVIDADE
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

// LISTANDO TODAS AS ATIVIDADES
app.get("/tasks", (req, res) => {
    return res.status(200).send(database)
})

// ATUALIZANDO ATIVIDADE
app.put("/tasks/:id", (req, res) => {
    const { id } = req.params
    const { title, description } = req.body
    const date = new Date()

    const tasks = database.find(data => {
        return data.id === id
    })


    if(!tasks){
        return res.status(404).send("Atividade não encontrada")
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

// DELETANDO ATIVIDADE
app.delete("/tasks/:id", (req, res) => {
    const { id } = req.params

    const task = database.find(data => {
        return data.id === id
    })

    if(!task){
        return res.status(404).send("Usuário não encontrado.")
    } else{
        const indexOfTask = database.findIndex(data => data.id === id)
        database.splice(indexOfTask, 1)
        res.status(200).json({message: "Sucess", data: database})
    }

})


// COMPLETANDO ATIVIDADE
app.patch("/tasks/:id/complete", (req, res) => {
    const { id } = req.params
    const date = new Date()

    const patchTasks = database.find(data => data.id === id)

    if(!patchTasks){
        return res.status(404).send("Atividade não encontrada!")
    }else{
        database.map(data => {
            if(data.id === id){
                data.completed_at = `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
            }
            return data
        })
    }
    res.status(200).send("Atividade completada!")
})

app.listen(5000, () => {
    console.log("Server Running")
})