import React, { useState } from 'react'
import Note from './components/Note'

const App = (props) => {

  const [notes, setNotes] = useState(props.notes)

  //存储表单中的内容
  const [valueNote, setValueNote] = useState('input a note')

  //控制是否显示全部的note
  const [showAll,setShowAll] = useState(true)

  //根据条件过滤Note
  const notesToShow = showAll ? 
                    notes : notes.filter(note => note.important)

  const addNote = (event) => {
    event.preventDefault();
    const newNote = {
      id : notes.length + 1,
      content : valueNote ,
      date : new Date().toISOString ,
      importance : Math.random() < 0.5
    }
    setNotes(notes.concat(newNote))
    setValueNote('')
  }

  const handleNoteChange = (event) => {
    console.log('input value :', event.target.value);
    setValueNote(event.target.value);
  }

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => setShowAll(!showAll)}>
        show {showAll ? 'important' : 'all'}
      </button>
      <ul>
        {notesToShow.map(note =>
          //渲染数组时务必指定key
          <Note key={note.id} note={note} />
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
