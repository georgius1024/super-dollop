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
    this.state = { items: [], counter: 0, asc: 1, edit: {}, editing: false }
    if (window.localStorage.getItem(storeKey)) {
      try {
        this.state = JSON.parse(window.localStorage.getItem(storeKey))
      } catch (error) {
      }
    }
    this.state.confirm = false
    this.state.editing = false
    this.onRemove = this.onRemove.bind(this)
    this.onAdd = this.onAdd.bind(this)
    this.onEdit = this.onEdit.bind(this)
    this.onEditorClose = this.onEditorClose.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onComplete = this.onComplete.bind(this)
    this.onSortOrder = this.onSortOrder.bind(this)
  }
  componentDidUpdate() {
    window.localStorage.setItem(storeKey, JSON.stringify(this.state))
  }
  onRemove(item) {
    const onConfirm = () => {
      const [...items] = this.state.items.filter(e => e.id !== item.id)
      this.setState({ items, confirm: false })
    }
    this.confirm('Confirm', `Delete task "${item.title}"?`, 'Delete', onConfirm)
  }
  onEditorClose() {
    this.setState({ editing: false })
  }
  onEdit(item) {
    this.setState({ editing: true, edit: item })
  }
  onSave(title, item) {
    if (item) {
      const items = _cloneDeep(this.state.items)
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
  onSortOrder(asc) {
    this.setState({ asc })
  }
  confirm(title, question, confirmVerb, onConfirm) {
    const onReject = () => {
      this.setState({ confirm: false })
    }
    const confirm = {
      title, question, confirmVerb, onConfirm, onReject
    }
    this.setState({ confirm })
  }
  render() {
    let confirm = ''
    if (this.state.confirm) {
      const { title, question, confirmVerb, onConfirm, onReject } = this.state.confirm
      confirm = (
        <ConfirmDialog
          title={title}
          question={question}
          confirmVerb={confirmVerb}
          onConfirm={onConfirm}
          onReject={onReject}
        >
        </ConfirmDialog>
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
            <TodoOrder value={this.state.asc} onChange={this.onSortOrder}></TodoOrder>
            <TodoList
              items={this.state.items}
              order={this.state.asc}
              onEdit={this.onEdit}
              onRemove={this.onRemove}
              onComplete={this.onComplete}
            ></TodoList>
            <TodoEditor edit={this.state.edit} active={this.state.editing} onSave={this.onSave} onClose={this.onEditorClose} ></TodoEditor>
            <button type="button" autofocus className="button is-primary margin-top" onClick={this.onAdd}>
              Add task
            </button>
          </div>
        </div>
        {confirm}
      </div>
    )
  }
}

export default App;
