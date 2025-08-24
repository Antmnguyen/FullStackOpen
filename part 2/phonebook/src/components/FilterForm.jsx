const FilterForm = ({nameSearch, handleSearch}) => {
    return (
        <form> 
            <div>
                filter shown with <input value = {nameSearch} // will store nameToSearch
                onChange = {handleSearch}
                /> 
            </div> 
      </form>
    )
}

export default FilterForm