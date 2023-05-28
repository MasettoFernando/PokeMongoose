import express from 'express'
import handlebars from 'express-handlebars'
import pokemonRouter from './routes/pokemon.router.js'
import mongoose from 'mongoose'

const uri = 'mongodb+srv://masettofernando:86njr3ykXn2cqX3r@clusterfm.5c5spbs.mongodb.net/pokedex'


const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.engine('handlebars', handlebars.engine())
app.set('views', './src/views')
app.set('view engine', 'handlebars')

app.use(express.static('./src/public'))

app.use('/pokemon', pokemonRouter)
app.get('/', (req, res) => res.send('ok'))

mongoose.set('strictQuery', false)
try{
    await mongoose.connect(uri)
    console.log('DB connected!')
    app.listen(8080, () => console.log('Server up'))
}catch(err){
    console.log('No se puede conectala a la BD')
}

