const renderCourse = (course) =>(
  <div>
      <h1>{course.name}</h1>
      {course.parts.map(parts => 
      <p key = {parts.id}> {parts.name} {parts.exercises} </p> )}
      <p><b> total of {course.parts.reduce((accumulator, part) => 
        accumulator + part.exercises, 0)}</b>  </p>
  </div>
);


const Course = ({ courses }) => {
  return (
    <div>
      {courses.map(course => (
        <div key={course.id}>
          {renderCourse(course)}
        </div>
      ))}
    </div>
  );
}

export default Course