const printPerson = (persons) => { //takes in a persons object
   //if (!person || !person.id) return null
  return (
    <p key= {persons.id}> {persons.name}: {persons.number}</p>
  )
}


export default printPerson