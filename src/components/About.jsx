import React from 'react'
import { Link } from 'react-router-dom'

const About = () => {
  return (
    <div>
      <p className='text-4xl'>About</p>
      <p>
        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Amet dolores delectus sit illum odio? Et, tempora animi in, earum iusto magni sed iure quia molestias rem corporis commodi perferendis blanditiis?
      </p>
      <Link to="/">Home</Link>
      <p>hello</p>
    </div>
  )
}

export default About