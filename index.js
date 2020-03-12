require('dotenv').config()
const express=require('express')
const {SERVER_PORT, CONNECTION_STRING} = process.env
const massive=require('massive')
const ctrl = require('./products_controller')
const app=express()

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
}).then(db =>{
    app.set('db', db)
    console.log('DB connected')
}).catch(err => console.log(err))

app.get('/api/products',ctrl.getAll)
app.get('/api/product/:id', ctrl.getOne)
app.put('/api/products/:id', ctrl.update)
app.post('/api/products', ctrl.create)
app.delete('/api/products/:id', ctrl.delete)

const port = SERVER_PORT
app.listen(port, () => console.log(`Server listening on ${port}`))