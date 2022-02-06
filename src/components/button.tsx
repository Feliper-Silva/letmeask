type ButtonProps = {
  text?: string
}

export const Button = (props: ButtonProps) => {
  return (
    <button>{props.text || "Clique Aqui"}</button>
  )
}