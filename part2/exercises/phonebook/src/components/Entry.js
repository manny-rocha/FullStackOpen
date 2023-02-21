const Entry = ({ personObject, deletePerson }) => {
    return ( 
      <>
        <li>{personObject.name} : {personObject.number}</li>
        <button onClick={() => deletePerson(personObject)}>Delete</button>
      </>
    )
  }
  
export default Entry 