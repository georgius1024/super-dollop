import React from 'react'
export default ({title, completed, onRemove, onEdit, onComplete}) => {
  let completedButton
  if (!completed) {
    completedButton = (
      <button className="button is-small is-success is-pulled-right" onClick={onComplete}>
        complete
      </button>
    )
  } else {
    completedButton = (
      <button className="button is-small is-disabled is-pulled-right">
        completed
      </button>
    )
  }
  return (
    <article className="box is-info">
      <button className="button is-small is-danger is-pulled-right margin-left" onClick={onRemove}>
        delete
      </button>
      <button className="button is-small is-danger is-pulled-right margin-left" onClick={onEdit}>
        edit
      </button>
      {completedButton}
      <p>{title}</p>
    </article>    
  )
}
