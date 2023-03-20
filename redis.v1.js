const express = require('express')
const app = express()

app.get('/order', (req, res) => {
  const time = new Date().getTime()
  console.log(`Time Request = ${time}`)

  const slTonKho = 10
  const keyName = 'iPhone13'

  return res.json({
    status: 'success',
    msg: 'OK',
    time
  })
})

app.listen(3000, () => {
  console.log('Running 3000')
})
