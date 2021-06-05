import React from 'react'
import Header from './Header'
import Content from './Content'
import Total from './Total'

const Course = ({ course }) =>{

  const parts = course.parts
    return(
      <div>
        <Header course = {course.name} />
  
        
        
        {parts.map(part=> <Content part = {part.name} exercises = {part.exercises} />)}
        
        <Total course ={course} />
      </div>
    )
  }
  

export default Course