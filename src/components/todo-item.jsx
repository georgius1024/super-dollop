import React from 'react'
export default ({title, onRemove}) => {
  return (
    <article className="message is-info">
      <div className="message-header">
        <p>{title}</p>
        <button className="delete" onClick={onRemove}></button>
      </div>
    </article>    
  )
}
