import React from 'react'
const App = () => {

  const now = Date()
  const a = 10
  const b = 10
  return (
    <>
      <p>Hello world,now is {now.toString()}</p>
      <p>{a} plus {b} is {a+b}</p>
      <Hello name="cyd" />
      <Hello/>
      <Hello/>
    </>
  )
}

const Hello = (props) => {
  return(
    <div>
      <p>Hello world,Welcome to {props.name}</p>
    </div>
  )
}
export default App;