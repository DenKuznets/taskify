import React, { useRef } from "react";
import "./styles.css";

// указываем типы свойств которые мы получаем из App.tsx , что бы тайпскрипт не ругался
interface Props {
  todoText: string;
  // тип setTodo мы посмотрели наведя мышку на useState, там всплывает тип функции которую возвращает useState hook
  setTodoText: React.Dispatch<React.SetStateAction<string>>;
  // тип события React.FormEvent которое происходит при отправрке формы (и которое нам нужно предотвратить с помощью e.preventDefault() ). Его мы загуглили по фразе "event type in react typescript". В обучалке сказано, что стоит так гуглить все типы которые мы не можем догадаться
  handleAdd: (e: React.FormEvent) => void;
}

// в обучалке чувак всегда пишет функции через const Blabla = () => вместо function Blabla. Может ему так просто нравится
function InputField({ todoText, setTodoText, handleAdd }: Props) {
  // тип <HTMLInputElement> мы подсмотрели наведя мышь на <input>. Таким же образом можно смотреть типы всех реакт элементов  
  const inputRef = useRef<HTMLInputElement>(null);
  // console.log(inputRef);

  return (
    <form
      className="input"
      onSubmit={(e) => {
        handleAdd(e);
        // благодаря тому, что мы указали тип элемента в useRef<HTMLInputElement> нам доступны свойства объекта такого типа, а конкретно метод blur. Блур если вкратце вызывается на инпут элементе и говорит ему потерять фокус. Это нам нужно что бы убрать затенение которое мы добавили при вводе текста в input
        inputRef.current?.blur();
      }}
    >
      <input
        // передаем переменную в свойство ref , и в момент ввода текста ей будет присвоена ссылка на инпут элемент
        ref={inputRef}
        type="input"
        value={todoText}
        onChange={(e) => setTodoText(e.target.value)}
        placeholder="Enter a task"
        className="input__box"
      />
      <button className="input_submit" type="submit">
        Go
      </button>
    </form>
  );
};

export default InputField;
