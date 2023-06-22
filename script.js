let form = document.querySelector("#form");
let input = document.querySelector("#input");
let todoList = document.querySelector(".todo-list");

form.addEventListener("submit", submit);

function submit(event) {
  event.preventDefault();
  let value = input.value;
  input.value = "";
  let element = `
  <li class="todo-item" data-todo-status="active">
    <button class="done-btn"></button>
    <p class="todo-text">${value}</p>
    <button class="cancel-btn"></button>
  </li>
`;

  todoList.insertAdjacentHTML("afterbegin", element);
}

function deleteHandler(event) {
  if (event.target.className === "cancel-btn") {
    const currentElement = event.target.closest("li");
    todoList.removeChild(currentElement);
  }
}

todoList.addEventListener("click", deleteHandler);
