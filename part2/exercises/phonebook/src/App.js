import { useState, useEffect } from 'react'
import Entry from './components/Entry'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Notification from './components/Notification' 
import personService from './services/entries' 
import { v4 as uuidv4 } from 'uuid';

function App(props) { 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNumber] = useState('')
  const [search, setSearch] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialEntries => {
        setPersons(initialEntries)
      })
  }, [])

  const setEntry = (event) => {
    event.preventDefault()
    const personObject = {
        name: newName,
        number: newNumber,
        id: uuidv4()
      }

    if (persons.some((persons) => persons.name === newName)) {
      alert(`${ newName } is already added to phonebook`)
      setNewName('');
      setNumber('');
    } else {
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson));
          setNewName('');
          setNumber('');
        })
    }
  }

  const handleNameChange = (event) => {
    console.log(event.target.value);
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value);
    setNumber(event.target.value)
  }

  const handleSearch = (event) => {
    console.log(event.target.value);
    setSearch(event.target.value)
  }

  const personsToShow = search
    ? persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    : persons

  const deletePerson = (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      personService
        .remove(person.id)
        .then(() => {
          setPersons(persons.filter((p) => p.id !== person.id));
        })
        .catch((error) => {
          setErrorMessage(          
            `${ newName } was already removed from server`        
            )        
            setTimeout(() => {          
              setErrorMessage(null)        
            }, 5000)
        });
    }
  };

  return (
    <div>

      <h2>Phonebook</h2>

      <Notification message={errorMessage} />

      <Filter search={search} handleSearch={handleSearch} />

      <h3>Add a new person</h3>

      <PersonForm 
        setEntry={setEntry} 
        handleNameChange={handleNameChange} 
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>

      <ul>
        {personsToShow.map((person, index) => (

          <Entry 
            key={index} 
            personObject={person}
            deletePerson={deletePerson}
          />
          
        ))}
      </ul>

    </div>
  );
}

export default App