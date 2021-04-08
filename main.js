//modulos
import express from 'express'
import fs from 'fs'
//constantes
const PORT = 8080
let visitasItems = 0
let visitasItemRandom = 0

//fetch .txt
const fetchTXT = () => {
  try {
    const data = fs.readFileSync('productos.txt', 'utf8')
    return JSON.parse(data)
  } catch (e) {
    console.log('Error:', e.message)
  }
  return data
}
const dataFetched = fetchTXT()

//1 - Get all items from productos.txt

const getItems = (arr) => {
  visitasItems++
  let titulos = []
  for (let i = 0; i < arr.length; i++) {
    titulos.push(arr[i].title)
  }

  return { items: titulos, cantidad: arr.length }
}

//server
const app = express()

app.get('/items', (req, res) => {
  res.status(200).json(getItems(dataFetched))
})

//2 - Get a random Item from productos.txt

const randomItem = (arr) => {
  visitasItemRandom++
  const randomNumber = Math.ceil(Math.random() * arr.length)
  return { item: arr[randomNumber - 1].title }
}

app.get('/item-random', (req, res) => {
  res.status(200).send(randomItem(dataFetched))
})

//3 - Get count of total visits

const getVisitas = () => {
  return { visitas: { items: visitasItems, item: visitasItemRandom } }
}
app.get('/visitas', (req, res) => {
  res.status(200).send(getVisitas())
})

//crear server y escuchar error
const server = app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`)
})

server.on('error', (error) => console.log(`error: ${error.message}`))
