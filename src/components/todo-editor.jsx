import React, { Component } from 'react'
import _cloneDeep from 'lodash.clonedeep'

export default class TodoEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.input = React.createRef()
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
    if (this.props.todo) {
      this.setValue(this.props.todo.title)
    } else {
      this.setValue('')
    }
    this.input.current.focus()
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
  }

  onChange(event) {
    this.setValue(event.target.value)
  }

  onSave() {
    let updated = this.props.todo ? _cloneDeep(this.props.todo) : {}
    updated.title = this.state.value
    this.props.onSave(updated)
  }

  onKeyDown(event) {
    switch (event.key) {
      case 'Escape':
        return this.props.onCancel()
      case 'Enter':
        return this.onSave()
      default:
        return
    }
  }

  setValue(value) {
    this.setState({ value })
  }

  render() {
    const title = this.props.todo ? 'Edit task' : 'Add task'
    return (
      <div className='modal is-active'>
        <div className="modal-background" />

        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{title}</p>
            <button className="delete" onClick={this.props.onCancel}></button>
          </header>

          <section className="modal-card-body">
            <div className="field">
              <label className="label">Enter task title</label>
              <div className="control">
                <input
                  ref={this.input}
                  className="input"
                  type="text"
                  placeholder="Enter task title"
                  value={this.state.value}
                  onChange={this.onChange}
                />
              </div>
            </div>
          </section>

          <footer className="modal-card-foot">
            <button type="button" className="button is-primary" onClick={this.onSave}>Save</button>
            <button className="button" onClick={this.props.onCancel}>Cancel</button>
          </footer>
        </div>
      </div>
    )
  }
}

