import React, { useState ,useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [persons, setPersons] = useState([])

  const baseUrl = "http://localhost:3001/persons";

  const hook = () => {
    console.log('hook called');
    axios
      .get(baseUrl)
      .then(response => {
        console.log('response: ',response.data);
        setPersons(response.data);
      });
  }

  useEffect(hook,[]);


  const [personValue, setPersonValue] = useState('')
  const [curTel, setCurTel] = useState('')
  const [filter, setFilter] = useState('')

  const personsShow = filter === '' ?
    persons : persons.filter(person =>
      person.name.toLowerCase.includes(filter.toLowerCase))

  const handleInputValue = (event) => {
    console.log('input name :', event.target.value);
    setPersonValue(event.target.value);
  }

  const handleInputTel = (event) => {
    setCurTel(event.target.value);
  }

  const handleInputFilter = (event) => {
    setFilter(event.target.value);
  }

  const addNewPerson = (event) => {

    event.preventDefault();
    if (!checkName(personValue)) return;

    const newBook = persons.concat({
      name: personValue,
      number: curTel
    });
    setPersons(newBook);
    setPersonValue('')
  }

  const checkName = (value) => {
    for (let person of persons) {
      if (person.name === value) {
        alert(`${value} was already added in the PhoneBook`)
        return false;
      }
    }
    return true;
  }

  return (
    <div>
      <h1>Phone book</h1>
      <h3>Search</h3>
      <div>
        fliter show with <input onChange={handleInputFilter} />
      </div>
      <form onSubmit={addNewPerson}>
        <div>name: 
          <input value={personValue} onChange={handleInputValue} /></div>
        <div>Tel: 
          <input value={curTel} onChange={handleInputTel} /></div>
        <div>
          <button type="submit">Add</button></div>
      </form>
      <PersonList persons={personsShow} />
    </div>
  )
}

const PersonList = ({ persons }) => {
  return (
    <div>
      <h3>Numbers</h3>
      <ul>
        {persons.map((person, id) =>
          <li key={id}>
            {person.name} : {person.number}
          </li>
        )}
      </ul>
    </div>
  )
}



export default App;
