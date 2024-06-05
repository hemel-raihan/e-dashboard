const express = require('express')
const cors = require('cors')

require('./db/config')
const User = require('./db/User')
const Product = require('./db/Product')
const app = express()

app.use(express.json())
app.use(cors())

app.post('/register', async (req, res) => {
    try{
        let user = new User(req.body)
        let result = await user.save()
        result = result.toObject()
        delete result.password
        res.status(201).send(result)
    }
    catch(error){
        res.status(400).send(error)
    }
})

app.post('/login', async (req, res) => {
    if(req.body.password && req.body.email){
        let user = await User.findOne(req.body).select('-password')
        if(user){
            res.send(user)
        }
        else{
            res.send('No User Found!')
        }
    }
    else{
        res.send('Email or Password required!')
    }
})

app.get('/product-list', async (req, res) => {
    let products = await Product.find()
    if(products.length > 0){
        res.send(products)
    }
    else{
        res.send({result: 'No product found!'})
    }
})

app.post('/add-product', async (req, res) => {
    try{
        let product = new Product(req.body)
        let result = await product.save()
        res.status(200).send(result)
    }
    catch(error){
        res.status(400).send(error)
    }
})

app.get('/get-product/:id', async (req, res) => {
    let result = await Product.findOne({_id: req.params.id})
    if(result){
        res.send(result)
    }
    else{
        res.send({result: 'No Record found!'})
    }
})

app.put('/update-product/:id', async (req, res) => {
    const result = await Product.updateOne(
        {_id: req.params.id},
        {
            $set: req.body
        }
    )
    res.send(result)
})

app.delete('/delete-product/:id', async (req, res) => {
    const result = await Product.deleteOne({_id: req.params.id})
    res.send(result)
})

app.get('/search-product/:key', async (req, res) => {
    let result = await Product.find({
        '$or': [
            {name: {$regex: req.params.key}},
            {company: {$regex: req.params.key}},
            {category: {$regex: req.params.key}},
            {price: {$regex: req.params.key}},
        ]
    })
    res.send(result)
})


app.listen(5000)