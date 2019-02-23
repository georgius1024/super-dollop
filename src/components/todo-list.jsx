import React from 'react'
import TodoItem from './todo-item'
export default ({items, order, onRemove, onEdit}) => {
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
    const callRemove = () => {
      onRemove(item.id)
    }
    return ( <TodoItem title={item.title} onEdit={callEdit} onRemove={callRemove} key={item.id} /> )
  })

  return (
    <section>
      {list}
    </section>
  )
}
