import React, { useState } from 'react'

const App = () => {
  const [anecIdx, setIdx] = useState(0)

  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0])

  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  //随机显示下一条箴言
  const nextAnec = () => {
    setIdx(Math.round(Math.random() * (anecdotes.length - 1)))
  }

  //对箴言投票
  const handleClickVote = () => {
    const v = [...votes]
    v[anecIdx] += 1
    setVotes(v)
  }

  // let mostAnecdotesIdx = Math.max(votes)

  return (
    <div>
      <p>{anecdotes[anecIdx]}</p>
      <p>has {votes[anecIdx]} votes</p>
      <button onClick={handleClickVote}>vote</button>
      <button onClick={nextAnec}>next</button>

      {/* <MostAnecdotes text={anecdotes[mostAnecdotesIdx]} count={1}/> */}
    </div>
  )
}

const MostAnecdotes = ({text,count})  => {
  return(
    <div>
      <h1>Anecdotes with the most votes</h1>
      <p>{text}</p>
      <p>has {count} votes</p>
    </div>
  )
}

export default App;
