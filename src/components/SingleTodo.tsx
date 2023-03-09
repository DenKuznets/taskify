import { useState } from "react";
import { Todo } from "./model";
// Для использования react icons находим на их сайте https://react-icons.github.io/react-icons/search?q=edit нужную иконку, например AiFillEdit. В импорте указываем название целиком, а в from после react-icons/ пишем название группы иконок (первое слово в названии иконки - ai в данном примере). ПОтом в jsx указываем иконку как отдельный элемент c таким же названием <AiFillEdit />
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";
import "./Styles.css";

// здесь обучалка использует type вместо interface просто для разнообразия примера
type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todoText);
  // нажатие на иконку "галочка". меняем isDone с тру на фалс
  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };
  // нажатие enter после редактирования текста в тудушке. Я бы назвал функцию doneEditing или типа того
  const handleEdit = (e: React.FormEvent, id: number) => {
    // Предотвращаем отправку формы(наша единичная тудушка это форма)
    e.preventDefault();
    // у туду совпадающей по айди, текст делаем равным editTodo
    setTodos((todos) =>
      todos.map((todo) => (todo.id === id ? { ...todo, todoText: editTodo } : todo))
    );
    // выключаем режим редактирования
    setEdit(false);
  };

  // фильтруем имеющиеся todo по айди, фильтр вернет все тудушки кроме той у которой совпадает айди
  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {/* если нажата иконка "ручка" и мы в режиме редактирования, показать инпут текст которого равен тексту тудушки на которой была нажата ручка */}
      {edit ? (
        <input
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text"
        />
      ) : todo.isDone ? (
        <s className="todos__single--text">{todo.todoText}</s>
      ) : (
        <span className="todos__single--text">{todo.todoText}</span>
      )}

      <div>
        <span
          className="icon"
          onClick={() => {
            // если туду не в процессе изменения и не помечена как выполненная
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit />
        </span>
        <span className="icon" onClick={() => handleDelete(todo.id)}>
          <AiFillDelete />
        </span>
        <span className="icon" onClick={() => handleDone(todo.id)}>
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
