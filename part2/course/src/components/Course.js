import React from 'react'

const Course = (props) => {
    const { course } = props
    console.log('course.parts :', course.parts)

    return (
        <div>
            <Header title={course.name} />
            <Content parts={course.parts} />
            <Footer parts={course.parts}/>
        </div>
    )

}

const Header = ({ title }) => {
    return (
        <h1>{title}</h1>
    )
}

const Content = ({ parts }) => {
    return (
        <ul>
            {parts.map((part,i) =>
                <Part key={i} content={part.name} />
            )}
        </ul>
    )
}

const Part = ({ content }) => {
    console.log('part :', content);
    return (
        <li>{content}</li>
    )
}

const Footer = ({parts}) => {

    const total = getExercisesTotal(parts)

    return (<h5>total of {total} exercises</h5>)
}

function getExercisesTotal(parts) {
    const nums = parts.map(part => part.exercises)
    // const reducer = (a,b) => a + b;
    return nums.reduce((a,b) => a + b)
}



export default Course