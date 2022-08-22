import React, { useState, useRef, useEffect } from 'react'
import { Todo } from '../model'
import { AiFillEdit, AiFillDelete } from 'react-icons/ai'
import { MdDone } from 'react-icons/md'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

interface Props {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}


const SingleTodo: React.FC<Props> = ({ index, todo, todos, setTodos }) => {
  const [edit, setEdit] = useState<boolean>(false)
  const [editTodo, setEditTodo] = useState<string>(todo.todo)
  const inputRef = useRef<HTMLInputElement>(null)
  const handleDone = (id:number) => { 
    setTodos(
      todos.map((todo) => todo.id === id ? { ...todo, isDone:!todo.isDone}: todo
      )
    )
  }

  const handelDelete = (id:number) => {
    setTodos(todos.filter((todo) => todo.id !== id ))
  }

  const handelEdit = ( event: React.FormEvent, id: number ) => {
    event.preventDefault();
    
    setTodos(todos.map((todo) => ( 
      todo.id === id ? { ...todo, todo: editTodo} : todo
      )))
    setEdit(false)
  }

  useEffect(() => {
    inputRef.current?.focus()
  }, [edit])
  
  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshop) =>  (
        <form 
          className={`todos_single ${snapshop.isDragging ? 'drag' : ''}`}
          onSubmit={(event)=> handelEdit(event, todo.id)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          >
            {edit ? (
              <input 
                ref={inputRef}
                type="text" 
                value={editTodo} 
                onChange={ (event)=> setEditTodo(event.target.value) }
                className='todos_single_text'
                />
            ): 
            (
              todo.isDone ? (
                <s className='todos_single_text' >{todo.todo}</s>
              ) : (
                <span className='todos_single_text' >{todo.todo}</span>
              )
            )
              }
          <div>
            <span className="icon" onClick={() => {
              if ( !edit && !todo.isDone) {
                setEdit(!edit)
              }
            }} >
              <AiFillEdit />
            </span>
            <span className="icon" onClick={() => handelDelete(todo.id)} >
              <AiFillDelete />
            </span>
            <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span>
          </div>
        </form>
      )}
    </Draggable>
  )
}

export default SingleTodo