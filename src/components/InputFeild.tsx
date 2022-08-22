import React, { useRef } from 'react'
import'./styles.css'

interface Props {
  todo:string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleAdd: (event: React.FormEvent) => void;
}
const InputFeild:React.FC<Props> = ({todo, setTodo, handleAdd}) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <form className='input' onSubmit={(event) => {
      handleAdd(event)
      if (inputRef.current) {
        inputRef.current?.blur()
      }
      setTodo('')
      }}>
      <input 
        ref={inputRef} 
        className="input_box"
        type="input"
        placeholder='請輸入任務'
        value={todo}
        onChange={(event) => setTodo(event.target.value)}
       />
      <button className="input_submit" type="submit">Go</button>
    </form>
  )
}

export default InputFeild