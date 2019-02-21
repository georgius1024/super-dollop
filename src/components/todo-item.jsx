import React from 'react'
export default ({title, onRemove}) => {
  return (
    <article class="message is-info">
      <div class="message-header">
        <p>{{title}}</p>
        <button class="delete" onClick={onRemove}></button>
      </div>
    </article>    
  )
}
