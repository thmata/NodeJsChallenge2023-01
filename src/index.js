const express = require('express')
const app = express()

app.get( "/api/products/:id" , (req, res) => {
    const { id } = req.params
    
    console.log("Aqui está o ID", id)
})



app.listen(5000, () => {
    console.log("Server Running")
})