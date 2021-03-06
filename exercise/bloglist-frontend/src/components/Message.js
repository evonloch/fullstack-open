import React from 'react'

const Message = ({ message }) => {
  if(message === null) {
    return null
  }

  return (
    <div className = "msg">
      {message}
    </div>
  )
}


export default Message