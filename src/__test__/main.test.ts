import { addTodo, changeTodo, removeAllTodos } from "../ts/functions";
import { Todo } from "./../ts/models/Todo";

test("should add todo", () => {
  // Arrange
  let todos: Todo[] = [new Todo("inlämning", false)];
  let length = todos.length;
  let text = "inlämningsuppgift";

  // Act
  addTodo(text, todos);
  // Assert
  expect(todos.length).toBe(length + 1);
  expect(todos[todos.length - 1].text).toBe(text);
});

test("should not add empty todo to list", () => {
  // Arrange
  let todos: Todo[] = [new Todo("Inlämning", false)];
  let length = todos.length;
  let text = "";

  // Act
  addTodo(text, todos);

  // Assert
  expect(todos.length).toBe(length);
});

test("should not add todo containing 2 or less characters to list", () => {
  // Arrange
  let todos: Todo[] = [new Todo("Inlämning", false)];
  let length = todos.length;
  let text = "lo";

  // Act
  addTodo(text, todos);

  // Assert
  expect(todos.length).toBe(length);
});

test("should remove todos", () => {
  // Arrange
  let todos: Todo[] = [new Todo("inlämning", false)];
  let length = todos.length;

  // Act
  removeAllTodos(todos);
  // Assert
  expect(todos.length).toBe(length - 1);
});
