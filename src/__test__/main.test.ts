/**
 * @jest-environment jsdom
 */

import * as fnfunctions from "./../ts/functions";
import * as functions from "../ts/main";
import { Todo } from "../ts/models/Todo";

describe("createHtml", () => {
  test("should setItem to localStorage", () => {
    let todos: Todo[] = [new Todo("Inlämning", false)];

    functions.createHtml(todos);

    expect(todos.length).toBeGreaterThan(0);
  });

  test("test for loop", () => {
    let todos: Todo[] = [new Todo("Inlämning", false)];
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    let ul = document.getElementById("todos");

    functions.createHtml(todos);

    expect(ul?.innerHTML).toBe(`<li class="todo__text">${todos[0].text}</li>`);
  });
});
describe("displayError", () => {
  test("should add HTML to div", () => {
    //Arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let error: string = "Error Message";
    let show: boolean = true;

    //Act
    functions.displayError(error, show);

    //Assert
    expect((document.getElementById("error") as HTMLDivElement).innerHTML).toBe(
      "Error Message"
    );
  });

  test("should add class to div", () => {
    //Arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let error: string = "Error Message";
    let show: boolean = true;

    //Act
    functions.displayError(error, show);

    //Assert
    expect(
      (document.getElementById("error") as HTMLDivElement).classList.length
    ).toBe(2);
  });

  test("should not add class to div", () => {
    //Arrange
    document.body.innerHTML = `<div id="error" class="error"></div>`;
    let error: string = "Error Message";
    let show: boolean = false;

    //Act
    functions.displayError(error, show);

    //Assert
    expect(
      (document.getElementById("error") as HTMLDivElement).classList.length
    ).toBe(1);
  });
});

describe("createNewTodo", () => {
  test("Should call createHtml for Todo", () => {
    // arrange
    let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
    let todoText: string = "inlämning";
    let todos: Todo[] = [new Todo("Inlämning", false)];
    // act
    functions.createNewTodo(todoText, todos);
    // assert
    expect(spy).toBeCalled();
  });

  test("Should not call createHtml for Todo", () => {
    // arrange
    let spy = jest.spyOn(functions, "displayError").mockReturnValue();
    let todoText: string = "l";
    let todos: Todo[] = [new Todo("Inlämning", false)];

    // act
    functions.createNewTodo(todoText, todos);

    // assert
    expect(spy).toBeCalled();
  });
});

describe("toggleTodo", () => {
  test("should call changeTodo", () => {
    let spy = jest.spyOn(fnfunctions, "changeTodo").mockReturnValue();
    let todo: Todo = new Todo("inlämning", false);
    functions.toggleTodo(todo);

    expect(spy).toHaveBeenCalled();
  });
  test("should call createHtml", () => {
    let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
    let todo: Todo = new Todo("inlämning", false);

    functions.toggleTodo(todo);

    expect(spy).toHaveBeenCalled();
  });
});

describe("clearTodos", () => {
  test("should call removeAllTodos", () => {
    let spy = jest.spyOn(fnfunctions, "removeAllTodos").mockReturnValue();
    let todos: Todo[] = [new Todo("inlämning", false)];
    functions.clearTodos(todos);

    expect(spy).toHaveBeenCalled();
  });
  test("should call createHtml", () => {
    let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
    let todos: Todo[] = [new Todo("inlämning", false)];

    functions.clearTodos(todos);

    expect(spy).toHaveBeenCalled();
  });
});

test("should be able to click", () => {
  // Arrange
  let spy = jest.spyOn(functions, "createNewTodo").mockReturnValue();
  document.body.innerHTML = `<form id="newTodoForm"><div>
  <input type="text" id="newTodoText" />
  <button>Skapa</button>
    </div></form>`;
  let todos: Todo[] = [new Todo("inlämning", false)];
  let text = "inlämning";
  functions.init();

  // Act
  document.querySelector("button")?.click();

  // Assert
  expect(spy).toHaveBeenCalled();
});

test("should be able to click clearTodo", () => {
  // Arrange
  let todos: Todo[] = [new Todo("inlämning", false)];
  let spy = jest.spyOn(functions, "clearTodos").mockReturnValue();
  document.body.innerHTML = `<button type="button" id="clearTodos">Rensa lista</button>`;
  functions.init();

  // Act
  document.getElementById("clearTodos")?.click();

  // Assert
  expect(spy).toHaveBeenCalled();
});
