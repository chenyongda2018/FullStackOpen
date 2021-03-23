import React from 'react'
import Note from './components/Note'

const App = ({notes}) => {

  return (
    <div>
      <ul>
        {notes.map(note =>
          //渲染数组时务必指定key
          <Note key={note.id} note={note}/>
        )}
      </ul>
    </div>
  )
}

export default App;
