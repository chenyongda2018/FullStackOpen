import React, { useState ,useEffect } from 'react';
import PhoneApi from './services/phoneBookService';
import Notification from './components/notification';
import './index.css'

const App = () => {
  const [persons, setPersons] = useState([])

  const [personValue, setPersonValue] = useState('')
  const [curTel, setCurTel] = useState('')
  const [filter, setFilter] = useState('')

  const [notificationMessage,setNotificationMessage] = useState(null);

  const personsShow = filter === '' ?
    persons : persons.filter(person =>
      person.name.toLowerCase().includes(filter.toLowerCase()))

  const fetchData = () => {
    console.log('fetchData called');
    PhoneApi
      .getAll()
      .then(response => {
        console.log('response: ',response.data);
        setPersons(response.data);
      });
  }
  useEffect(fetchData,[]);

  const handleInputValue = (event) => {
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
    
    //若是已存在用户，则询问是否要替换
    if (isExist(personValue)) {
      if(window.confirm(`${personValue} was already added in the PhoneBook,replace the old number with a new one?`)) {

        const existPerson = persons.find(p => p.name === personValue);
        const updatePerson = {
          ...existPerson,
          number: curTel
        }
        PhoneApi
        .updatePhone(existPerson.id,updatePerson)
        .then(rsp => {
          console.log('update User: ',rsp.data);
          showNotification(`Updated ${updatePerson.name}`);
          //更新集合
          setPersons(persons.map(p => 
            p.id === existPerson.id ? rsp.data : p));
        });
      }
    } else {
      const newBook = {
        name: personValue,
        number: curTel
      }
      PhoneApi
      .addNewPhone(newBook)
      .then(rsp => {
        console.log('addNote rsp: ',rsp.data);
        showNotification(`Added ${personValue}`);
        setPersons(persons.concat(rsp.data));
      })
    }
    setPersonValue('');
    setCurTel('');
  }

  const delPhone = (delPerson) => {
    if(!window.confirm(`Delete ${delPerson.name} ?`)) return;
    PhoneApi
      .deletePhone(delPerson.id)
      .then(rsp => {
        console.log('del phone rsp: ',rsp.data);
      })
    //更新集合
    setPersons(persons.filter(p => p.id !== delPerson.id));
  }

  const isExist = (name) => {
    for (let person of persons) {
      if (person.name === name) {
        return true;
      }
    }
    return false;
  }

  const showNotification = (message) => {
    setNotificationMessage(message);
    setTimeout(()=>{
      setNotificationMessage(null);
    },5000);
  }

  return (
    <div>
      <h1>Phone book</h1>
      <Notification
        message={notificationMessage} />
      <div>
        fliter show with <input onChange={handleInputFilter} />
      </div>
      <form onSubmit={addNewPerson}>
        <h3>Add a new </h3>
        <div>name: 
          <input value={personValue} onChange={handleInputValue} /></div>
        <div>Tel: 
          <input value={curTel} onChange={handleInputTel} /></div>
        <div>
          <button type="submit">Add</button></div>
      </form>
      <PersonList persons={personsShow} delPhone={delPhone}/>
    </div>
  )
}

const PersonList = ({ persons,delPhone}) => {
  return (
    <div>
      <h3>Numbers</h3>
      <ul>
        {persons.map((person, id) =>
          <li key={id}>
            <PersonItem person={person} delPhone={()=>{delPhone(person)}}/>
          </li>
        )}
      </ul>
    </div>
  )
}

const PersonItem = ({person, delPhone}) => {

  return (
    <p>
      {person.name} : {person.number}
      <button onClick={delPhone}>Delete</button>
    </p>
  );
}




export default App;
