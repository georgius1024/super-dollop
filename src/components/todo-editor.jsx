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
    if (prevProps.edit !== this.props.edit) {
      let newValue = ''
      if (this.props.edit) {
        newValue = this.props.edit.title
      }
      if (this.state.value !== newValue) {
        this.setValue(newValue)
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
    if (this.props.edit) {
      this.setValue(this.props.edit.title)
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
    this.props.onSave(this.state.value, this.props.edit)
    this.setValue('')
  }
  onKeyDown(event) {
    if (this.props.active) {
      switch (event.key)  {
        case 'Escape':
          return this.onClose()
        case 'Enter':
          return this.onSave()
        default:
          return
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
    const verb = this.props.edit ? 'Save' : 'Add'
    return (
      <div className={'modal  ' + (this.props.active ? 'is-active' : '')}>
        <div className="modal-background" />
        <div className="modal-content has-background-white has-text-black-ter form padding-all">
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
          <button type="button" className="button is-pulled-right" onClick={this.onSave}>{verb}</button>
        </div>
        <button type="button" className="modal-close is-large" onClick={this.onClose} />
      </div>
    )
  }
}

