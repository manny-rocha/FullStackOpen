const Filter = ({ search, handleSearch }) => {
    return (
      <div>
        Search Phonebook: 
        <input 
          value={search.name}
          onChange={handleSearch}
        />
      </div>
    )
  }

export default Filter; 