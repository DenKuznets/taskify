import React from "react";
import { Droppable } from "react-beautiful-dnd";
import { Todo } from "./model";
import SingleTodo from "./SingleTodo";
import "./Styles.css";

interface Props {
  todos: Todo[];
  // тип функции setTodos берем из строки const [todos, setTodos] = useState<Todo[]>([]); в App.tds наведя мышку на useState
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

// указывать тип Props в дженерике это альтернативный вариант. Можно было сделать как в InputField.tsx : написать TodoList({ todos, setTodos }: Props)
const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  return (
    <div className="container">
      {/* Droppable, provided, snapshot имеют отношение к библиотеке beautifull dnd */}
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            // dragactive класс добавляем к списку что бы подсветить его когда над ним держим мышкой перетаскиваемый элемент
            className={`todos ${snapshot.isDraggingOver ? "dragactive" : ""}`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Active Tasks</span>
            {todos.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={todos}
                key={todo.id}
                setTodos={setTodos}
              />
            ))}
            {/* плейсхолдер нужен для сохранения пространства перетаскиваемого объекта, что бы когда мы начинаем его перетаскивать, другие элементы тут же не занимали его место*/}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            // dragcomplete класс добавляем к списку что бы подсветить его когда над ним держим мышкой перетаскиваемый элемент. isDraggingOver true когда над этим droppable элементом тащим draggable элемент
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">Completed Tasks</span>
            {completedTodos?.map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                todos={completedTodos}
                key={todo.id}
                setTodos={setCompletedTodos}
              />
            ))}
            {/* здесь плейсхолдер предоставляет свобдное место для объекта когда мы перетаскиваем в пустой список завершенных заданий */}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;
