import React, { Component } from 'react';
import TodoList from './components/todo-list'
import TodoEditor from './components/todo-editor'
import TodoOrder from './components/todo-order'
const storeKey = 'state'
class App extends Component {
  constructor(props) {
    super(props)
    this.state = { items: [], counter: 0, asc: 1, edit: {}, editing: false }
    if (window.localStorage.getItem(storeKey)) {
      try {
        this.state = JSON.parse(window.localStorage.getItem(storeKey))
      } catch (error) {
      }
    }
    this.onRemove = this.onRemove.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onEditorClose = this.onEditorClose.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onSortOrder = this.onSortOrder.bind(this)
  }
  componentDidUpdate() {
    window.localStorage.setItem(storeKey, JSON.stringify(this.state))
  }
  onRemove(id) {
    const [...items] = this.state.items.filter(e => e.id !== id)
    this.setState({ items })
  }
  onEditorClose() {
    this.setState({ editing: false })
  }
  onEdit(item) {
    this.setState({ editing: true, edit: item })
  }
  onSave(title, item) {
    if (item) {
      const [...items] = this.state.items
      const saved = items.find(e => e.id === item.id)
      if (saved) {
        saved.title = title
      }
      this.setState({ items, editing: false })
    } else {
      const [...items] = this.state.items
      const counter = this.state.counter + 1
      items.push({
        id: counter,
        title
      })
      this.setState({ items, counter, editing: false })
      }
  }
  onAdd() {
    this.setState({ editing: true, edit: false })
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
            <TodoOrder value={this.state.asc} onChange={this.onSortOrder}></TodoOrder>
            <TodoList items={this.state.items} order={this.state.asc} onEdit={this.onEdit} onRemove={this.onRemove}></TodoList>
            <TodoEditor edit={this.state.edit} active={this.state.editing} onSave={this.onSave} onClose={this.onEditorClose} ></TodoEditor>
          </div>
        </div>
      </div>
    )
  }
}

export default App;
