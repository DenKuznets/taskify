import { useState } from "react";
import "./App.css";
import InputField from "./components/InputField";
import { Todo } from "./components/model";
import TodoList from "./components/TodoList";
import {DragDropContext, DropResult} from 'react-beautiful-dnd'

const App: React.FC = () => {
  // текст одного туду
  const [todoText, setTodoText] = useState<string>("");
  // todos массив содержащий все текущие записки
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([]);

  // handle add - выполнить действие при нажатии кнопки "Go". Так ее назвали в обучалке, я бы назвал onGoPressed или типа того
  const handleAdd = (e: React.FormEvent) => {
    // предотвращаем отправку формы по умолчанию
    e.preventDefault();
    // если в inputе есть текст
    if (todoText) {
      // к остальным запискам добавляем новую с текстом из input, Id создаем рандомный из текущей даты в милисекундах
      setTodos([
        ...todos,
        { id: Date.now(), todoText: todoText, isDone: false },
      ]);
      // очищаем поле input от текста
      setTodoText("");
    }
  };

  // тип DropResult предоставляется библиотекой react-beautiful-dnd
  // сам result предоставляется функцией onDragEnd в DragDropContext (это как например в eventListener мы получаем аргумент event)
  const onDragEnd = (result: DropResult) => {
    // source и destination мы взяли из result. Если посмотреть через console.log(result) мы увидим, что result имеет два эти свойства. Они нужны для написания логики перетаскивания тудушек из одного списка в другой
    const { source, destination } = result;
    // если мы перетащили тудушку (элемент списка) на часть страницы не предназначенную для перетаскивания (на синий фон куда нибудь например), то destination будет null и делать ничего не надо
    if (!destination) return;
    // если мы подцепили мышкой элемент но никуда не перетащили, или перетащили но вернули на место, делать ничего не надо
    if (destination.droppableId === source.droppableId && destination.index === source.index) return;
    let add,
      active = todos,
      complete = completedTodos;
    
    // логика удаления подхваченного мышкой элемента из списка в котором мы его подцепили. Если в нашем приложении больше двух списков откуда-куда можно перетаскивать, то нужно добавлять соответственное число вариантов в эту логику, а не только if-else
    // если подцепили элемент из списка Active Tasks
    if (source.droppableId === 'TodosList') {
      // add - элемент который мы подцепили
      add = active[source.index];
      // удаляем его из списка в котором мы его подцепили
      active.splice(source.index, 1);
    } else {
      // тоже самое но из противоположного списка
      add = complete[source.index];
      complete.splice(source.index, 1)
    }

    // логика добавления подхваченного мышкой элемента в список куда мы его перетащили. Опять же если в приложении больше 2х окон откуда-куда можно перетащить, расширяем логику на это количество окон (например switch вместо if-else)
    if (destination.droppableId === "TodosList") {
      //добавляем перетащенный элемент в новый списoк, ничего не удаляя из этого списка
      active.splice(destination.index, 0 , add)
    } else {
      complete.splice(destination.index, 0, add);
    }

    // обновляем state для активных и выполненных тудушек
    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    // добавление DragDropContext элемента и его свойств в обучалке не объяснялось, берем как есть
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">TASKIFY</span>
        <InputField
          todoText={todoText}
          setTodoText={setTodoText}
          handleAdd={handleAdd}
        />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setCompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;
