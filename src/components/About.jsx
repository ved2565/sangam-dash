import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <p className='text-4xl'>About</p>
      <Link to="/">Home</Link>
    </div>
  )
}

export default About