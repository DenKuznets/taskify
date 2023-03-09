import React from 'react'
import { Todo } from './model'
import SingleTodo from './SingleTodo';
import './styles.css'

interface Props {
  todos: Todo[];
  // тип функции setTodos берем из строки const [todos, setTodos] = useState<Todo[]>([]); в App.tds наведя мышку на useState
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

// указывать тип Props в дженерике это альтернативный вариант. Можно было сделать как в InputField.tsx : написать TodoList({ todos, setTodos }: Props)
const TodoList: React.FC<Props> = ({ todos, setTodos }) => {
  return <div className="todos">
    {todos.map(todo => (
      <SingleTodo todo={todo} key={todo.id} todos={todos} setTodos={setTodos} />
    ))}
  </div>;
};
 
export default TodoList