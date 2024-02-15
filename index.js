const express = require('express')
const app = express()

app.use(express.json())
app.use('*', (req, res) => {
  res.json({ msg: 'GEDANG GORENG TEST' }).end()
})

const port = 4000
app.listen(port, () => {
  console.log(`index.js listening on ${port}`)
})
