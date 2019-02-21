import React from 'react'
import TodoItem from './todo-item'
export default ({items, onRemove}) => {
  const list = items.map(item => <TodoItem title={item.title} onRemove={onRemove} />)
  return (
    <section>
      {{list}}
    </section>
  )
}
