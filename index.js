const express = require('express')
const app = express()
const db = require('@cyclic.sh/dynamodb')

app.use(express.json())
app.use('*', (req, res) => {
  res.json({ msg: 'GEDANG GORENG TEST' }).end()
})

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
