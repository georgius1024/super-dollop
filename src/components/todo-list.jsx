import React from 'react'
import TodoItem from './todo-item'
export default ({items, order, onRemove, onEdit, onComplete}) => {
const list = items
.sort((a, b) => {
    if (Number(order) === 0) {
      return b.title.localeCompare(a.title)
    } else {
      return a.title.localeCompare(b.title)
    }
  })
  .map(item => {
    const callEdit = () => {
      onEdit(item)
    }
    const callComplete = () => {
      onComplete(item)
    }
    const callRemove = () => {
      onRemove(item)
    }
    return ( 
      <TodoItem 
        title={item.title} 
        completed={item.completed}
        onEdit={callEdit} 
        onRemove={callRemove} 
        onComplete={callComplete} 
        key={item.id} 
      /> 
    )
  })

  return (
    <section>
      {list}
    </section>
  )
}
