import React from 'react'

const Input = ({type, cls, ids, placeholder, value, onChange}) => {
  return (
    <div className="form-group">
      <input type={type} className="form-control form-control-user" placeholder={placeholder} value={value} onChange={onChange} />
    </div>
  );
}

export default Input
