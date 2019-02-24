import React, { Component } from 'react';
import _cloneDeep from 'lodash.clonedeep'
import TodoList from './components/todo-list'
import TodoEditor from './components/todo-editor'
import TodoOrder from './components/todo-order'
import ConfirmDialog from './components/confirm'
const storeKey = 'state'

class App extends Component {
  constructor(props) {
    super(props)
    const initialState = { items: [], counter: 0, asc: 1 }
    
    if (window.localStorage.getItem(storeKey)) {
      try {
        this.state = JSON.parse(window.localStorage.getItem(storeKey))
      } catch (error) {
        this.state = initialState
      }
    } else {
      this.state = initialState
    }
    
    this.state.confirm = false
    this.state.editing = false
    this.onRemove = this.onRemove.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onComplete = this.onComplete.bind(this)
    this.onChangeSortOrder = this.onChangeSortOrder.bind(this)
  }

  componentDidUpdate() {
    const { items, counter, asc } = this.state
    window.localStorage.setItem(storeKey, JSON.stringify({ items, counter, asc }))
  }

  onAdd() {
    this.setState({ editing: { todo: false} })
  }

  onEdit(item) {
    this.setState({ editing: { todo: item} })
  }

  onSave(item) {
    const items = _cloneDeep(this.state.items)
    if (item.id) {
      const saved = items.findIndex(e => e.id === item.id)
      if (saved >= 0) {
        items[saved] = item
      }
      this.setState({ items, editing: false })
    } else {
      const counter = this.state.counter + 1
      item.id = counter
      items.push(item)
      this.setState({ items, counter, editing: false })
    }
  }

  onComplete(item) {
    const onConfirm = () => {
      const items = _cloneDeep(this.state.items)
      const completed = items.find(e => e.id === item.id)
      if (completed) {
        completed.completed = true
      }
      this.setState({ items, confirm: false })
    }
    this.confirm('Confirm', `Mark task "${item.title}" as completed?`, 'Mark completed', onConfirm)
  }

  onRemove(item) {
    const onConfirm = () => {
      const [...items] = this.state.items.filter(e => e.id !== item.id)
      this.setState({ items, confirm: false })
    }
    this.confirm('Confirm', `Delete task "${item.title}"?`, 'Delete', onConfirm)
  }

  onChangeSortOrder(asc) {
    this.setState({ asc })
  }

  confirm(title, question, confirmVerb, onConfirm) {
    const confirm = {
      title, question, confirmVerb, onConfirm
    }
    this.setState({ confirm })
  }

  render() {
    let confirm = ''
    if (this.state.confirm) {
      const { title, question, confirmVerb, onConfirm } = this.state.confirm
      const onReject = () => {
        this.setState({ confirm: false })
      }
      confirm = (
        <ConfirmDialog
          title={title}
          question={question}
          confirmVerb={confirmVerb}
          onConfirm={onConfirm}
          onReject={onReject}
        />
      )
    }

    let editor = ''
    if (this.state.editing) {
      const onCancel = () => {
        this.setState({ editing: false })
      }
      editor = (
        <TodoEditor
          todo={this.state.editing.todo}
          onSave={this.onSave}
          onCancel={onCancel}
        />
      )
    }

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
        <div className="columns is-mobile margin-top">
          <div className="column is-half is-offset-one-quarter">
            <TodoOrder 
              value={this.state.asc} 
              onChange={this.onChangeSortOrder}
            />
            
            <TodoList
              items={this.state.items}
              order={this.state.asc}
              onEdit={this.onEdit}
              onRemove={this.onRemove}
              onComplete={this.onComplete}
            />

            <button type="button" autoFocus className="button is-primary margin-top" onClick={this.onAdd}>
              Add task
            </button>
          </div>
        </div>
        {confirm}
        {editor}
      </div>
    )
  }
}

export default App;
