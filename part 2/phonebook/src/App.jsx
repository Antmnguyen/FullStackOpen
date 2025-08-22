import { useState } from 'react'

const printPerson = (persons) => { //takes in a persons object
  return (
    <p key= {persons.id}> {persons.name}: {persons.number}</p>
  )
}


const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', 
      number:0,
      id:0,
    }
  ]) 
  const [newName, setNewName] = useState('') //to track input
  const [newNumber, setNewNumber] = useState('') //track number input
  const [showAll, setShowAll] = useState(true)
  const [nameSearch, setNameSearch] = useState('')

  const search = (person, nameSearch) => {
  // convert both to lowercase for case-insensitive search
  return person.name.toLowerCase().includes(nameSearch.toLowerCase());
  };

  const personsToShow = showAll ? persons : persons.filter(person => search(person,nameSearch))

  const addPerson = (event) => {
      event.preventDefault()
      const nameExists = persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ); //checks if name already exists boolean value from persons.some
      
      if (nameExists) {
        alert(`${newName} is already in the phonebook`); //sends alert
        return; // stop adding
      }

      const personObject = {
        name: newName,
        number: newNumber,
        id: String(persons.length + 1),
      }
      
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
  }

const handleSearch = (event) => {
  const query = event.target.value;
  if (query.length >= 1) {
    setShowAll(false);
  } else {
    setShowAll(true); // you need this to show all when search is empty
  }
  console.log(query);
  setNameSearch(query);
};

 const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  return ( 
    <div> 
      <h2>Phonebook</h2>
      <form> 
        <div>
          filter shown with <input value = {nameSearch} // will store nameToSearch
          onChange = {handleSearch}
          /> 
        </div> 

      </form>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} //saves everything in newNote
          onChange={handleNameChange} //this is what saves it into new note
          />
          <p>
          Number: <input value={newNumber} //saves everything in newNote
          onChange={handleNumberChange} //this is what saves it into new note
          />
          </p>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>

      {personsToShow.map(printPerson)}
    </div>
  )
}

export default App