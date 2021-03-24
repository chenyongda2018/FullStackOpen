import React, { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    {
      name: 'Lei Jun',
      tel: '1234234234'
    }
  ])

  const [personValue, setPersonValue] = useState('')
  const [curTel, setCurTel] = useState('')
  const [filter, setFilter] = useState('')

  const personsShow = filter === '' ?
    persons : persons.filter(person =>
      person.name.includes(filter))

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
      tel: curTel
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
        <div>name: <input value={personValue} onChange={handleInputValue} /></div>
        <div>Tel: <input value={curTel} onChange={handleInputTel} /></div>
        <div><button type="submit">Add</button></div>
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
            {person.name} : {person.tel}
          </li>
        )}
      </ul>
    </div>
  )
}



export default App;
