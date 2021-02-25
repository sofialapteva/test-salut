const express = require('express');
const cors = require('cors')
const app = express()

app.use(express.json())
app.use('/', express.static('img'))
app.use(cors())

app.post('/', (req, res) => {
  console.log(req.body)
  res.end()
})

app.listen(3001)
