import React, { Component } from 'react'
class TodoAdd extends Component {
  constructor(props) {
    super(props)
    this.state = { value: '' }
    this.onChange = this.onChange.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }
  onChange(event) {
    this.setState({ value: event.target.value})
  }
  onAdd() {
    this.props.onAdd(this.state.value)
    this.setState({ value: ''})
  }
  render() {
    return (
      <div className="field">
      <div className="control">
        <input
          className="input"
          type="text"
          placeholder="Enter task title"
          value={this.state.value}
          onChange={this.onChange}
        />
      </div>
      <div className="is-pulled-right">
      <a className="button" onClick={this.onAdd}>Add</a>
      </div>
    </div>
    )
  }
}

export default TodoAdd