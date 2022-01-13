import React from 'react'

const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.name}</h1>
    </div>
  )
}

const Part = (props) => {
  return (
    <>
      <p>{props.name} {props.age}</p>
    </>
  )
}

const Content = (props) => {
  return (
    <div>
      <Part name={props.t[0].name} age={props.t[0].exercises}/>
      <Part name={props.t[1].name} age={props.t[1].exercises}/>
      <Part name={props.t[2].name} age={props.t[2].exercises}/>
    </div>
  )
}

const Total = (props) => {
  return (
    <p>Number of exercises {props.t[0].exercises + props.t[1].exercises + props.t[2].exercises}</p>
  )
}

const App = () => {
  const course = {
  name: 'Half Stack application development',
  parts: [
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
  },
]
}

  return (
    <>
      <Header name={course.name} />
      <Content t={course.parts}/>
      <Total t={course.parts}/>
    </>
  )
}

export default App
