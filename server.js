const express = require('express')
const morgan = require('morgan')
const validator = require('validator')
const app = express()
const collectibles = [
  { name: 'shiny ball', price: 5.95 },
  { name: 'autographed picture of a dog', price: 10 },
  { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
]
const shoes = [
  { name: 'Birkenstocks', price: 50, type: 'sandal' },
  { name: 'Air Jordans', price: 500, type: 'sneaker' },
  { name: 'Air Mahomeses', price: 501, type: 'sneaker' },
  { name: 'Utility Boots', price: 20, type: 'boot' },
  { name: 'Velcro Sandals', price: 15, type: 'sandal' },
  { name: 'Jet Boots', price: 1000, type: 'boot' },
  { name: 'Fifty-Inch Heels', price: 175, type: 'heel' }
]
app.use(morgan('dev'))
app.get('/greetings/:name', (req, res) => {
  console.log(req.params.name)
  res.send(`<h1>Hello there, ${req.params.name}</h1>`)
})
app.get('/roll/:number', (req, res) => {
  console.log(req.params.number)
  if (!validator.isNumeric(req.params.number)) {
    res.send('<h1>You must specify a number.</h1>')
  }
  const randomNumber = Math.floor(
    Math.random() * (req.params.number - 1 - 1 + 1) + 1
  )

  res.send(`<h1>You rolled a ${randomNumber}</h1>`)
})
app.get('/collectibles/:index', (req, res) => {
  console.log(req.params.index)
  const item = collectibles[req.params.index]
  if (item) {
    res.send(
      `So, you want the ${item.name}? For ${item.price}, it can be yours!`
    )
  } else {
    res.send('This item is not yet in stock. Check back soon!')
  }
})

app.get('/shoes', (req, res) => {
  const min = req.query.min
  const max = req.query.max
  const type = req.query.type
  let filter = []
  shoes.forEach((sho) => {
    let flag = true

    if (min && sho.price < min) {
      flag = false
    }
    if (max && sho.price > max) {
      flag = false
    }
    if (type && sho.type !== type) {
      flag = false
    }
    if (flag) {
      filter.push(sho)
    }
  })
  res.json(filter.length > 0 ? filter : shoes)
})

app.listen(3000, () => {
  console.log(`listining on part 3000`)
})
