const express = require('express')
const app = express()

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/info', (request, response) => {
  const time = new Date()
  const count =  persons.length
    response.send(`
    <p>Phonebook has info for ${count} people</p>
    <p>${time}</p>
    `)

})

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.delete('/api/persons/:id')
{
    const id = request.params.id
    persons = persons.filter(persons => persons.id !== id)
}

const generateId = () => {
  const id = String(Math.floor(Math.random() * 101)) // 0 to 100 inclusive
  return id
}

app.post('/api/persons/:id')
{
    const body = request.body //the object sent via post request

    if(!body.name)
    {
        return response.status(400).json({
            error: 'name missing'  
        })
    }
    else if(!body.number)
    {
        return response.status(400).json({
            error: 'number missing'  
        })
    }
    else if(persons.some(person=> person.name === body.name))
    {
        return response.status(400).json({
            error: 'Duplicate name'  
        })
    }

    const person = {  //sets person to values passed in
        name: body.name,
        number: body.number,
        id: generateId(),
    }
    persons = persons.concat(person) //adds it to array
    response.json(person) //responds with a json to check
}
    

app.get('/api/persons/:id', (request, response) => {

  const id = request.params.id
  const person = persons.find(person=> person.id === id)
  if (person)
  {
    response.json(person)
  }
  else
  {
    response.status(404).end()
  }
})
const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})