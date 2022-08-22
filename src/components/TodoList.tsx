import React from 'react'
import { Todo } from '../model'
import SingleTodo from './SingleTodo'
import { Droppable } from 'react-beautiful-dnd'
import './styles.css'

interface Props {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>,
  completedTodos:Todo[],
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const Todolist: React.FC<Props> = ({ todos, setTodos, completedTodos, setCompletedTodos }: Props) => {
  return (
    <div className="container">
      <Droppable droppableId='todoList'>
        {
          (provided,snapshot) => (
            <div
              className={`todos ${snapshot.isDraggingOver ? 'dragactive' : ''}`}
              ref={provided.innerRef} 
              {...provided.droppableProps}>
              <span className='todos_header'>
                 Active Task
              </span>
              {todos.map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  setTodos={setTodos}
                />))}
              {provided.placeholder}
            </div>
          )
        }
      
      </Droppable>
      <Droppable droppableId='todoRemoves'>
        {
          (provided, snapshot) => (
            <div 
              className={`todos ${snapshot.isDraggingOver ? 'dragcomplete' : 'remove'}`}
              ref={provided.innerRef}
              {...provided.droppableProps}
              >
              <span className='todos_header'>
                Completed Task
              </span>
              {completedTodos?.map((todo, index) => (
                <SingleTodo 
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                />))}
              {provided.placeholder}
            </div>
          )
        }
      </Droppable>
    </div>
  )
}

export default Todolist