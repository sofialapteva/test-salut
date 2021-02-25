const express = require('express');
const cors = require('cors')
const app = express()

let db = []
app.use(express.json())
app.use('/', express.static('img'))
app.use(cors())

app.post('/', (req, res) => {
  const query = db.find(el =>
    el.doctor === req.body.doctor && el.time === req.body.time
  )
  if (query) {
    res.json('Данное время занято');
  } else {
    db.push(req.body)
    console.log(db)
    res.json('Успешная запись');
  }
})

app.post('/appointments', (req, res) => {
  const query = db.filter(el =>
    el.doctor === req.body.doctor && el.time.split(',')[0] === req.body.date
  )
  res.json(query)
})

app.delete('/appointments', (req, res) => {
  const query = db.filter(el =>
    el.doctor === req.body.doctor && el.time !== req.body.time
  )
  db = db.filter(el => el.doctor !== req.body.doctor || el.doctor === req.body.doctor && el.time !== req.body.time)
  res.json(query)
})

app.listen(3001)
