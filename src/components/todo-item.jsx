import React from 'react'
export default ({title, onRemove}) => {
  return (
    <article className="box is-info">
      <button className="delete is-pulled-right" onClick={onRemove}></button>
      <p>{title}</p>
    </article>    
  )
}
