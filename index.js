import cors from 'cors'
// import dotenv from 'dotenv'
import 'dotenv/config'
import express from 'express'
import seeMail from './seeMail.js'
import sendMail from './sendMail.js'


const app = express()
const port = 4000 || process.env.PORT


// enable cors to allow all origins to access the api even in development
app.use(cors())


// enable body parser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post('/send-mail', sendMail);

app.post('/see-mail', seeMail);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})