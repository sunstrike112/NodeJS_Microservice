const express = require('express')
const app = express()
const { get, set, setnx, incrby, exists } = require('./model.redis')

app.get('/order', async (req, res) => {
  const time = new Date().getTime()
  console.log(`Time Request = ${time}`)

  // Hang ton kho = 10, soluong mua = 1
  const slTonKho = 10
  const keyName = 'iPhone13'
  const slMua = 1
  
  // So luong da ban ra, neu chua ban ra thi set = 0, con neu ban roi thi update + 1 moi lan order thanh cong
  const getKey = await exists(keyName)

  if (!getKey) {
    // set = 0
    await set(keyName, 0)
  }

  // Lay so luong ban ra
  let slBanRa = await get(keyName)
  console.log(`Before ORDER, soluongbanra = ${slBanRa}`)
  // Neu (so luong ban ra + so luong mua) > soluong ton khi thi FALED
  if (+slBanRa + slMua > slTonKho) {
    console.log('Het hang')
    return
  }
  
  // Neu user order thanh cong
  await incrby(keyName, slMua) // ATOM redis
  console.log(`After ORDER, soluongbanra = ${slBanRa}`)

  return res.json({
    status: 'success',
    msg: 'OK',
    time
  })
})

app.listen(3000, () => {
  console.log('Running 3000')
})
