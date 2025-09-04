import { useState, useEffect } from 'react'
import axios from 'axios'
import printPerson from './components/printPerson'
import AddPersonForm from './components/AddPersonForm'
import FilterForm from './components/FilterForm.jsx'
import personService from './services/persons'
import Notification from './components/Notification.jsx'



const App = () => {
  const [persons, setPersons] = useState([])  //initally empty persons array
  const [newName, setNewName] = useState('') //to track input
  const [newNumber, setNewNumber] = useState('') //track number input
  const [showAll, setShowAll] = useState(true)
  const [nameSearch, setNameSearch] = useState('')
  const [notification, setNotification] = useState('Notification.')



    const showNotification = (msg) => {
    setMessage(msg);

    // Clear message after 3 seconds
    setTimeout(() => {
      setMessage(null);
    }, 3000);
  };
  useEffect(() => {
    console.log('effect');

    const eventHandler = response => {
      console.log('promise fulfilled');
      setPersons(response.data);

      // Show a notification for 3 seconds
      setNotification('Data loaded successfully!');
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);

      // Clean up in case the effect runs again before 3s
      return () => clearTimeout(timer);
    };

    //promiseService.getAll(eventHandler);

    const promise = axios.get('http://localhost:3001/api/persons');
    promise.then(eventHandler);

  }, []); // empty array: runs only once on mount



   // Clear notification automatically after 3 seconds
  useEffect(() => {
    if (notification === null) return;

    const timer = setTimeout(() => {
      setNotification(null);
    }, 3000);

    return () => clearTimeout(timer); // cleanup if notification changes
  }, [notification]); // runs whenever notification changes
  
  const search = (person, nameSearch) => {
  // convert both to lowercase for case-insensitive search
  return person.name.toLowerCase().includes(nameSearch.toLowerCase());
  };

  const personsToShow = showAll ? persons : persons.filter(person => search(person,nameSearch))

  const addPerson = (event) => {
      event.preventDefault()
      /*
      const nameExists = persons.some(
        (person) => person.name.toLowerCase() === newName.toLowerCase()
      ); //checks if name already exists boolean value from persons.some
      */
     

      const personObject = {
        name: newName,
        number: newNumber,
        //id: String(persons.length + 1),
      }
      const existingPerson = persons.find(
        person => person.name.toLowerCase() === newName.toLowerCase()
      )
      if (existingPerson) { //checks if person alr exists and then asks if you wanna change their number
      const confirmUpdate = window.confirm(
        `${newName} is already in the phonebook. Do you want to update the number?`
      )
      if (confirmUpdate)
      {
        personService.update(existingPerson.id, personObject) 
        .then(newPerson => {setPersons(persons.map(p =>
        p.id !== newPerson.id ? p : newPerson
        )) //replaces old person with new person number
        setNewName('')
        setNewNumber('')
        setNotification('Updated ' + newPerson.name + 's number' )
      })
          
          return; // stop adding
        }
      }
      
      personService.create(personObject)
      .then(newPerson => {
        setPersons(persons.concat(newPerson)) // append single object
        setNewName('')
        setNewNumber('')
        setNotification('Added ' + newPerson.name)
      })
      /*
      personService  //creates a person object in the person json an
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data))
        setNewName('')
        setNewNumber('')})
      */
  }



const handleDelete = (id) => { //handles delete event handler which will pass into a button later
  if (window.confirm('Are you sure you want to delete this person?')) {  //if confirmed you continue
    personService.destroy(id).then(() => {
      setPersons(prevPersons => prevPersons.filter(person => person.id !== id))  
    }) //simple person service destroys that id in the json file. set persons then removes that person from the person array
  }
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
    setNewName(event.target.value) //changes name to new name recieves event from form submission
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }


  return ( 
    <div> 
      <h2>Phonebook</h2>
      <Notification message = {notification}></Notification>
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

      {personsToShow.map(person => printPerson(person, handleDelete))} 
    </div>
  )
}
export default App