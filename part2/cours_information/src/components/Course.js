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
export default Course