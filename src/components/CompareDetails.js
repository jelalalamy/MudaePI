import React from 'react'

const CompareDetails = ({ results }) => {
  return (
    <div className='compareDetails'>
        {(results.map((char) => (<p className={char.type}>{char.msg}</p>)))}
    </div>
  )
}

export default CompareDetails