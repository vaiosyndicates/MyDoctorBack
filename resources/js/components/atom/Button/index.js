import React from 'react'

const Button = ({label, onClick, cls, haveIcon}) => {
  if(haveIcon){
    return (
      <button className={cls} onClick={onClick}>
        <i className="fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400" />
        {label}
      </button>
    )
  }

  return (
    <button className={cls} onClick={onClick}>
      {label}
    </button>
  )
}

export default Button
