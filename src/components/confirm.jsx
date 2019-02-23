import React, { Component } from 'react'
export default class Confirm extends Component {
  constructor(props) {
    super(props)
    this.onKeyDown = this.onKeyDown.bind(this)
  }
  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDown)
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDown)
  }
  onKeyDown(event) {
    switch (event.key)  {
      case 'Escape':
        return this.props.onReject()
      case 'Enter':
        return this.props.onConfirm()
      default:
        return
    }
  }
  render() {
    return (
      <div className={'modal is-active'}>
        <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">{this.props.title}</p>
            <button className="delete" onClick={this.props.onReject}></button>
          </header>
          <section className="modal-card-body">
            <p>{this.props.question}</p>
          </section>
          <footer className="modal-card-foot">
            <button className="button is-primary" onClick={this.props.onConfirm}>{this.props.confirmVerb || 'OK'}</button>
            <button className="button" onClick={this.props.onReject}>{this.props.rejectVerb || 'Cancel'}</button>
          </footer>
        </div>
      </div>
    )
  }
}

