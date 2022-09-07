const Header = (props) => {
  
  return (
    <div>
      
      <h1>{props.course}</h1>
    </div>
  )
}
const Content = (props) => {
  console.log(props,"wew")
  return (
    <div>
      <Part part={props.part1}  />
      <Part part={props.part2} />
      <Part part={props.part3} />
    </div>
  )
}
const Total = (props) => {
  
  return(
    <div>
      <p> number of exercises {props.part1+props.part2+props.part3}</p>
    </div>
  )
}
const Part = (props) => {
  console.log(props,"ss")
  return(
    <div>
      {props.part.name} {props.part.exercises} 
       
    </div>
  )
}
const App = () => {

  const course = 'Half Stack application development'

  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }
  
  return (
    <div>
      <Header course={course} />
      
      <Content part1= {part1} part2 ={part2} part3 ={part3}/>
      <Total part1 = {part1.exercises} part2 = {part2.exercises} part3 = {part3.exercises} />
      
      
    </div>
  )
}

export default App