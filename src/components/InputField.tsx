import React from "react";
import "./styles.css";

// указываем типы свойств которые мы получаем из App.tsx , что бы тайпскрипт не ругался
interface Props {
  todo: string;
  // тип setTodo мы посмотрели наведя мышку на useState, там всплывает тип функции которую возвращает useState hook
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  // тип события которое происходит при отправрке формы (и которое нам нужно предотвратить с помощью e.preventDefault() ). Его мы загуглили по фразе "event type in react typescript". В обучалке сказано, что стоит так гуглить все типы которые мы не можем догадаться
  handleAdd: (e: React.FormEvent) => void;
}

// в обучалке чувак всегда пишет функции через const Blabla = () => вместо function Blabla. Может ему так просто нравится
function InputField ({ todo, setTodo, handleAdd }: Props) {
  
  return (
    <form className="input" onSubmit={handleAdd}>
      <input
        type="input"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
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
