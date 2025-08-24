const printPerson = (persons) => { //takes in a persons object
  return (
    <p key= {persons.id}> {persons.name}: {persons.number}</p>
  )
}


export default printPerson