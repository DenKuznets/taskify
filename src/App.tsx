import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoList from "./components/TodoList";

const App: React.FC = () => {
  // todo это одна желтая записка
  const [todo, setTodo] = useState<string>("");
  // todos массив содержащий все текущие записки
  const [todos, setTodos] = useState<Todo[]>([]);

  // handle add - выполнить действие при нажатии кнопки "Go". Так ее назвали в обучалке, я бы назвал onGoPressed или типа того
  const handleAdd = (e: React.FormEvent) => {
    // предотвращаем отправку формы по умолчанию
    e.preventDefault();
    // если в inputе есть текст
    if (todo) {
      // к остальным запискам добавляем новую с текстом из input, Id создаем рандомный из текущей даты в милисекундах
      setTodos([...todos, { id: Date.now(), todo, isDone: false }]);
      // очищаем поле input от текста
      setTodo("");
    }
  };


  return (
    <div className="App">
      <span className="heading">TASKIFY</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default App;
