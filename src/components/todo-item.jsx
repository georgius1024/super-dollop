import React from 'react'
export default ({title, onRemove, onEdit}) => {
  return (
    <article className="box is-info">
      <button className="button is-small is-danger is-pulled-right margin-left" onClick={onRemove}>
        delete
      </button>
      <button className="button is-small is-danger is-pulled-right" onClick={onEdit}>
        edit
      </button>
      <p>{title}</p>
    </article>    
  )
}
