import React from 'react'
export default ({title, onRemove, onEdit, onComplete}) => {
  return (
    <article className="box is-info">
      <button className="button is-small is-danger is-pulled-right margin-left" onClick={onRemove}>
        delete
      </button>
      <button className="button is-small is-danger is-pulled-right margin-left" onClick={onEdit}>
        edit
      </button>
      <button className="button is-small is-success is-pulled-right" onClick={onComplete}>
        complete
      </button>
      <p>{title}</p>
    </article>    
  )
}
