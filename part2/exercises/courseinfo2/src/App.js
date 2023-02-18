
import Course from './Course'

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1.1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 1.2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 1.3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 1.4
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
          id: 2.1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2.2
        }
      ]
    }
  ]
  return (
    <div>
      {courses.map((course) => (
        <Course course={course} />
      ))}
    </div>
  );      
}


export default App