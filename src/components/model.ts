// описываем интерфейс Todo в отдельном файле, что бы использовать его в других частях программы
export interface Todo {
  id: number;
  todo: string;
  isDone: boolean;
}