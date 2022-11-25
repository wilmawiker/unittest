/**
 * @jest-environment jsdom
 */

import * as functions from "../ts/main";
import { Todo } from "../ts/models/Todo";

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

test("should call clearTodos", () => {
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

/* test("should toggle todos", () => {
  // Arrange
  let todo: Todo = new Todo("inlämning", false);
  let spy = jest.spyOn(functions, "toggleTodo").mockReturnValue();
  document.body.innerHTML = `<ul id="todos" class="todo"><li></li></ul>`;
  document.querySelector("li")?.addEventListener("click", () => {
    functions.toggleTodo(todo);
  });

  // Act
  document.querySelector("li")?.click();

  // Assert
  expect(spy).toHaveBeenCalled();
}); */

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
  test("Should create a html for Todo", () => {
    // arrange
    let spy = jest.spyOn(functions, "createHtml").mockReturnValue();
    let todoText: string = "Perry";
    let todos: Todo[] = [new Todo("Maxxy", false)];
    // act
    functions.createNewTodo(todoText, todos);
    // assert
    expect(spy).toBeCalledTimes(1);
  });

  test("Should not create a html for Todo", () => {
    // arrange
    let spy = jest.spyOn(functions, "displayError").mockReturnValue();
    let todoText: string = "Pe";
    let todos: Todo[] = [new Todo("Maxxy", false)];

    // act
    functions.createNewTodo(todoText, todos);

    // assert
    expect(spy).toBeCalledTimes(1);
  });
});

/* describe("createHtml", () => {
  test("should add class to list item element", () => {
    document.body.innerHTML = `<ul id="todos" class="todo"><li></li></ul>`;
    let todos: Todo[] = [new Todo("inlämning", true)];
    let text = "inlämning";

    for (let i = 0; i < todos.length; i++) {
      if (todos[i].done) {
        document.querySelector("li")?.classList.add("todo__text--done");
      }
    }

    expect(document.querySelector("li")?.classList[0]).toBe("todo__text--done");
  });

  test("should appendChild to container", () => {
    document.body.innerHTML = `<ul id="todos" class="todo"></ul>`;
    let todosContainer: HTMLUListElement = document.getElementById(
      "todos"
    ) as HTMLUListElement;
    document.body.innerHTML = `<li></li>`;
    let li: HTMLLIElement = document.querySelector("li") as HTMLLIElement;

    todosContainer.appendChild(li);

    expect(todosContainer.innerHTML).toBe(`<li></li>`);
  });
}); */
