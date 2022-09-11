
    
const Course = ({course}) => {
  return (
    <>
    <Header course={course}/>
    <Content parts={course.parts}/>
    </>
  )
}

const Header = ({course}) => {
  return(
    <h1>{course.name}</h1>
  )
}
const Part = ({part}) => 
  
    <p>
    {part.name} {part.exercises}
    </p>
   
const Content = ({parts}) => {
  

  return(
  <>
   {parts.map(line =>
    <  Part key={line.id} part={line} />)}
  </>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
  
    <Course course={course} />
 
  
  )
}

export default App