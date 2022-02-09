import {ButtonHTMLAttributes} from 'react'
import '../styles/Button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export const Button = (props:ButtonProps) => {
  return (
   <button className="button" {...props} />
  )
}