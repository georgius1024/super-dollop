import React, { Component } from 'react';
import TodoList from './components/todo-list'
import TodoAdd from './components/todo-add'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { items: [], counter: 0 }
    this.onRemove = this.onRemove.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }
  onRemove(id) {
    const [...items] = this.state.items.filter(e => e.id !== id)
    this.setState({ items })
  }
  onAdd(title) {
    const [...items] = this.state.items
    const counter = this.state.counter + 1
    items.push({
      id: counter,
      title
    })
    this.setState({ items, counter })
  }
  render() {
    return (
      <div className="App">
        <section className="hero">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">
                Todo App
              </h1>
            </div>
          </div>
        </section>
        <TodoAdd onAdd={this.onAdd}></TodoAdd>
        <TodoList items={this.state.items} onRemove={this.onRemove}></TodoList>
      </div>
    )
  }
}

export default App;
