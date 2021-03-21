import React, { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neotral, setNewtral] = useState(0)
  const [bad, setBad] = useState(0)

  const clickFb = (fbName) => () => {
    if (fbName === 'good') {
      setGood(good + 1)
    } else if (fbName === 'neotral') {
      setNewtral(neotral + 1)
    } else {
      setBad(bad + 1)
    }
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Btn handleClick={clickFb('good')} text='good' />
      <Btn handleClick={clickFb('neotral')} text='neotral' />
      <Btn handleClick={clickFb('bad')} text='bad' />
      <Statistics good={good} neotral={neotral} bad={bad} />
    </div>
  )
}

//统计信息面板
const Statistics = ({good,neotral,bad}) => {
  
  let count = good + neotral + bad 
  let avg = ((good - bad) / count )
  let positive = (good / count)

  if(count === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given.</p>
      </div>
    )
  }
  return (
    <div>
      <h1>statistics</h1>
      <Board fbName='good' count={good} />
      <Board fbName='neotral' count={neotral} />
      <Board fbName='bad' count={bad} />
      <Board fbName='average' count={avg} />
      <Board fbName='positive' count={positive * 100 + '%'} />
    </div>
  )
}


const Btn = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Board = ({ fbName, count }) => {
  return (
    <p>{fbName} : {count}</p>
  )
}

export default App;
