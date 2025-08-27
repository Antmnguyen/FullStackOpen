const printPerson = (person, handleDelete) => { //takes in a persons object
   //if (!person || !person.id) return null
   return (
    <p key={person.id}>
      {person.name}: {person.number}  <button onClick={() => handleDelete(person.id)}>delete</button>
    </p>
  )
}

export default printPerson