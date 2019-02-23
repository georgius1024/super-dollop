import React, { Component } from 'react'

export default class TodoEditor extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
    this.onClose = this.onClose.bind(this)
    this.onKeyDown = this.onKeyDown.bind(this)
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    let newValue = ''
    if (this.props.todo) {
      newValue = this.props.todo.title
    }
    if (this.state.value !== newValue) {
      this.setValue(newValue)
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
    if (this.props.todo) {
      this.setValue(this.props.todo.title)
    } else {
      this.setValue('')
    }
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
  onChange(event) {
    this.setValue(event.target.value)
  }
  onSave() {
    this.props.onAdd(this.state.value)
    this.setValue('')
  }
  onKeyDown(event) {
    if (this.props.active) {
      switch (event.key)  {
        case 'Escape':
          return this.onClose()
        case 'Enter':
          return this.onSave()
      }
    }
  }
  setValue(value) {
    this.setState({ value })
  }
  onClose() {
    this.props.onClose()
  }
  render() {
    const verb = this.props.todo ? 'Save' : 'Add'
    return (
      <div className={'modal  ' + (this.props.active ? 'is-active' : '')}>
        <div className="modal-background" />
        <div className="modal-content has-background-white has-text-black-ter form">
          <div className="field">
            <label className="label">Enter task title</label>
            <div className="control">
              <input
                className="input"
                type="text"
                placeholder="Enter task title"
                value={this.state.value}
                onChange={this.onChange}
              />
            </div>
          </div>
          <button type="button" className="button" onClick={this.onSave}>{verb}</button>
        </div>
        <button type="button" className="modal-close is-large" onClick={this.onClose} />
      </div>
    )
  }
}
