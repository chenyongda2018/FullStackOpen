import React, { useState, useEffect } from 'react'
import {Note,Notification} from './components/Note'
import noteService from './services/notes'
import './index.css'

const App = () => {

  const [notes, setNotes] = useState([])

  //存储表单中的内容
  const [valueNote, setValueNote] = useState('input a note')

  //控制是否显示全部的note
  const [showAll, setShowAll] = useState(true)

  //根据条件过滤Note
  const notesToShow = showAll ?
    notes : notes.filter(note => note.important)

  const [errMsg,setErrMsg] = useState('Something happened error...');

  const fetchNoteData = () => {
    console.log('effect');
    const nonExisting = {
      id: 10000,
      content: 'This note is not saved to server',
      date: '2019-05-30T17:30:31.098Z',
      important: true,
    }
    noteService
      .getAll()
      .then(response => {
        console.log('promise fulfilled');
        setNotes(response.data.concat(nonExisting));
        console.log('render', notes.length, 'notes');
      })
  }
  useEffect(fetchNoteData, []);

  //添加新的note
  const addNote = (event) => {
    event.preventDefault();
    const newNote = {
      id: notes.length + 1,
      content: valueNote,
      date: new Date().toISOString,
      important: Math.random() < 0.5
    }

    noteService
      .create(newNote)
      .then(response => {
        console.log('addNote rsp: ',response);
        setNotes(notes.concat(response.data));
        setValueNote('')
      });
  }

  //改变note的important属性
  const toggleImportanceOf = (id) => {
    console.log(`the id of ${id} need changed.`);
    const note = notes.find(n => n.id === id);
    const changeNote = {
      ...note,
      important:!note.important
    };

    noteService
      .update(id,changeNote)
      .then(response => {
        console.log('toggle imp rsp: ',response);
        setNotes(notes.map(note => note.id == id ? response.data : note));
      })
      .catch(error => {
        setErrMsg(`the note ${note.content} was already deleted from server.`)
        setTimeout(()=>{
          setErrMsg(null);
        },5000)
        //将不存在的note从集合中删除
        setNotes(notes.filter(n => n.id !== id));
      });
  }

  const handleNoteChange = (event) => {
    console.log('input value :', event.target.value);
    setValueNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errMsg} />
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          //渲染数组时务必指定key
          <Note 
            key={note.id} note={note} 
            toggleImportanceOf={()=>{toggleImportanceOf(note.id)}}
          />
        )}
      </ul>
      <form onSubmit={addNote}>
        <input
          value={valueNote}
          onChange={handleNoteChange} />
        <button type="submit">addNote</button>
      </form>
    </div>
  )
}

export default App;
