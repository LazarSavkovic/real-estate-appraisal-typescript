import React from 'react'

const Button = (props) => {
  return (
    <button onClick={props.function} className='hover:scale-105 focus:scale-95 transition-all bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-[Poppins] py-2 px-6 rounded md:ml-8 hover:bg-indigo-400 
    duration-500'>
      {props.children}
    </button>
  )
}

export default Button