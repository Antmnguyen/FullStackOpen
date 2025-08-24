const AddPersonForm = ({addPerson,newName,handleNameChange,newNumber,handleNumberChange}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
                name: 
                <input value={newName} //saves everything in newNote
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
    )
}

export default AddPersonForm