import React from 'react'
import TodoItem from './todo-item'
export default ({items, onRemove}) => {
const list = items.map(item => {
  const callRemove = () => {
    onRemove(item.id)
  }
  return ( <TodoItem title={item.title} onRemove={callRemove} key={item.id} /> )
})

  return (
    <section>
      {list}
    </section>
  )
}
