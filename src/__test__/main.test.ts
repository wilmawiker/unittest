/**
 * @jest-environment jsdom
 */

import { addTodo } from "../ts/functions";
import * as functions from "../ts/main";
import { createNewTodo } from "../ts/main";
import { Todo } from "../ts/models/Todo";

test("should find text in dom", () => {
  document.body.innerHTML = `<button id="clearTodos">Ok</button>`;
});

test("should be able to click", () => {
  // Arrange
  let spy = jest.spyOn(functions, "createNewTodo").mockReturnValue();
  document.body.innerHTML = `<form id="newTodoForm"></form>`;

  // Act
  document.getElementById("newTodoForm")?.click();

  // Assert
  expect(spy).toHaveBeenCalled();
});

test("should call clearTodos", () => {
  // Arrange
  let spy = jest.spyOn(functions, "clearTodos").mockReturnValue();
  document.body.innerHTML = `<button type="button" id="clearTodos">Rensa lista</button>`;

  // Act
  document.getElementById("clearTodos")?.click();

  // Assert
  expect(spy).toHaveBeenCalled();
});

test("should call on createHtml", () => {
  // Arrange
  let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
  let todos: Todo[] = [new Todo("inlämning", false)];
  let text = "inlämning";

  // Act
  createNewTodo(text, todos);

  // Assert
  expect(spy).toHaveBeenCalled();
});
