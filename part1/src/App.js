import React, { useState } from 'react'

const App = () => {
  const [counter, setCounter] = useState(0)


  const increasement = () => {
    //状态改变会是页面重新渲染
    setCounter(counter + 1)
  }

  const decreasement = () => {
    setCounter(counter - 1)
  }

  const reset = () => { setCounter(0) }

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increasement} text="plus" />
      <Button handleClick={decreasement} text="minus" />
      <Button handleClick={reset} text="reset" />
    </div>
  )
}

const Display = ({ counter }) => <div>{counter}</div>

const Button = ({handleClick,text}) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

export default App;