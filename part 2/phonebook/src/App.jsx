import { useState } from 'react'
import printPerson from './components/printPerson'
import AddPersonForm from './components/AddPersonForm'
import FilterForm from './components/FilterForm.jsx'

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

      <FilterForm
        nameSearch = {nameSearch}
        handleSearch = {handleSearch}
        />
      <h2>add a new</h2>
      
      <AddPersonForm  //form to ad a person in Addperson
        addPerson = {addPerson}
        newName = {newName}
        handleNameChange = {handleNameChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
      />

      <h2>Numbers</h2>

      {personsToShow.map(printPerson)}
    </div>
  )
}
export default App