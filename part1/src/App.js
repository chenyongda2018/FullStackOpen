import React from 'react'

const App = () => {

  const course = {
    name :  'Half Stack application development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content part={course.parts} />
      <Total parts={course.parts} />
    </div>
  )

}

const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course.name}</h1>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part part={props.part[0]}  />
      <Part part={props.part[1]}  />
      <Part part={props.part[2]}  />
    </div>
  )
}

const Part = (props) => {
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  let total = 0
  console.log("total ,",props.parts)

  props.parts.forEach(p => {
    total += p.exercises
  });
  return (
    <p>The exersices total is {total}</p>
  )
}

export default App;