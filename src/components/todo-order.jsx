import React from 'react'
export default ({value, onChange}) => {
  const onClick = (event) => {
    onChange(event.target.value)
  }
  
  const checkedAsc = Number(value)===1
  return (
    <div className="control margin-bottom">
    <label className="radio">
      <input type="radio" name="order" onChange={onClick}  onClick={onClick} checked={checkedAsc} value="1"/>Asc
    </label>
    <label className="radio">
      <input type="radio" name="order" onChange={onClick} onClick={onClick} checked={!checkedAsc} value="0" />Desc
    </label>
  </div>
  )
}
