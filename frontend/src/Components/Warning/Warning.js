import React from 'react'

function Warning({error}) {
  return (
    <div className='bg-yellow-300 text-center
         text-yellow-800 py-3'>
        {error}</div>
  )
}

export default Warning