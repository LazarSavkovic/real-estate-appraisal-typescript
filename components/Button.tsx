import React, { MouseEventHandler } from 'react'
import { FC, ReactNode } from 'react'

interface ButtonProps { 
  function: MouseEventHandler,
  children: ReactNode
}


const Button: FC<ButtonProps> = (props: ButtonProps) => {
  return (
    <button onClick={props.function} className='hover:scale-105 hover:shadow w-full focus:scale-95 transition-all bg-gradient-to-r from-blue-500 to-indigo-500 text-white py-2 px-6 rounded hover:bg-indigo-400 duration-200'>
      {props.children}
    </button>
  )
}

export default Button