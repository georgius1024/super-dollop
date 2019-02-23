import React from 'react'
import sortAscending from '../assets/sort-ascending.svg'
import sortDescending from '../assets/sort-descending.svg'
export default ({value, onChange}) => {
  const onClick = (event) => {
    onChange(event.target.value)
  }
  
  const checkedAsc = Number(value)===1
  return (
    <div className="control margin-bottom order">
      <span>Sort order:</span>
      <label className="radio margin-left">
        <input type="radio" name="order" onChange={onClick}  onClick={onClick} checked={checkedAsc} value="1"/>
      </label>
      <img src={sortAscending} className="margin-right" alt=""/>
      <label className="radio margin-left">
        <input type="radio" name="order" onChange={onClick} onClick={onClick} checked={!checkedAsc} value="0" />
      </label>
      <img src={sortDescending} className="svg" alt=""/>
    </div>
  )
}
