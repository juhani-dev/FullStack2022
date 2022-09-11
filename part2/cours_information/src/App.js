
    
const Course = ({course}) => {
  return (
    <>
    <Header course={course}/>
    <Content parts={course.parts}/>
    <Total parts={course.parts}/>
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

const Total = ({parts}) => {
  
  const total = 0
  
  const sum = parts.reduce(function (accumulator, curValue) {
    console.log(curValue.exercises)
    return accumulator + curValue.exercises
  }, total)
  
  console.log(sum)
return (
  <>total of {sum} exercises</>
)
}

const App = () => {
  const course =  [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  return (
    
    <div>
      <ul>
        
    {course.map(line =>  
      < Course  key={line.id} course={line}/>
      
    )  }
     </ul>
    </div>
    
 
  
  )
}

export default App