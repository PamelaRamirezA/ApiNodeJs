import express from 'express'
import deliveryRouter from './routes/deliveries'

const morgan = require ('morgan')
const exphbs = require ('express-handlebars')
const path = require ('path')
const app = express()

app.use(express.json())

const PORT = 3000
app.set('views', path.join(__dirname, 'views'))
app.engine('.hbs', exphbs.engine({
    defaultLayout : 'main',
    extname : '.hbs'
}))

app.set('view engine', '.hbs')

app.use(morgan('dev'))
app.use(express.urlencoded({extended: false}))
app.use(express.static(path.join(__dirname, 'public')))

app.get('/ping', (_req,res) => {
    console.log('pinged here ' + new Date().toLocaleDateString())
    res.send('pong')
} )

app.use('/api/deliveries', deliveryRouter)

app.listen(PORT, () => {
    console.log('Server running on port ' + PORT)
})