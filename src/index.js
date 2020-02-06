import express from 'express'
import bodyParser from 'body-parser'
import axios from 'axios'
import cors from 'cors'

const PORT = process.env.PORT || 3000
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.post('/send', async (req, res) => {
  try {
    axios.post('https://api.sendgrid.com/v3/mail/send', req.body, {
      headers: {
        Authorization: `Bearer ${process.env.SENDGRID_API_KEY}`
      }
    })
  } catch (err) {
    res.status(500)
    res.render('error', { error: err })
  }

  res.send('OK')
})

app.listen(PORT, () => console.log(`Listening on port ${PORT}`))
