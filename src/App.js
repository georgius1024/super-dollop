import React, { Component } from 'react';
import TodoList from './components/todo-list'
import TodoAdd from './components/todo-add'
import TodoOrder from './components/todo-order'
const storeKey = 'state'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { items: [], counter: 0, asc: 1 }
    if (window.localStorage.getItem(storeKey)) {
      try {
        this.state = JSON.parse(window.localStorage.getItem(storeKey))
      } catch (error) {
      }
    }
    this.onRemove = this.onRemove.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onSortOrder = this.onSortOrder.bind(this)
  }
  componentDidUpdate() {
    window.localStorage.setItem(storeKey, JSON.stringify(this.state))
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
  onSortOrder(asc) {
    this.setState({ asc })
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
        <div className="columns is-mobile">
          <div className="column is-half is-offset-one-quarter">
            <TodoAdd onAdd={this.onAdd}></TodoAdd>
            <TodoOrder value={this.state.asc} onChange={this.onSortOrder}></TodoOrder>
            <TodoList items={this.state.items} onRemove={this.onRemove}></TodoList>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
