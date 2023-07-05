let form = document.querySelector("#form");
let input = document.querySelector("#input");
let todoList = document.querySelector(".todo-list");
let itemsLeft = document.querySelector(".items-left");
let clearComplete = document.querySelector(".clear-complete");
let filters = document.querySelector(".filters-list");

const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const getTodos = () => {
  return JSON.parse(localStorage.getItem("todos")) || [];
};

const generateRandomString = () => {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

const renderItems = (items) => {
  let todoElements = items.map(function (item) {
    return `
    <li class="todo-item" data-todo-status="${item.status}" data-todo-id="${item.id}">
      <button class="done-btn"></button>
      <p class="todo-text">${item.value}</p>
      <button class="cancel-btn"></button>
    </li>
    `;
  });
  todoList.innerHTML = todoElements.join("");
  itemsLeft.textContent = `${items.length} items left`;
};

form.addEventListener("submit", submit);

function submit(event) {
  event.preventDefault();
  let todo = {
    id: generateRandomString(),
    status: "active",
    value: input.value,
  };
  let todos = getTodos();
  todos.unshift(todo);
  saveTodos(todos);
  input.value = "";
  renderItems(todos);
}

function todoListHandler(event) {
  if (event.target.className === "cancel-btn") {
    const currentElementID = event.target
      .closest("li")
      .getAttribute("data-todo-id");
    let newTodos = getTodos().filter((item) => {
      if (item.id !== currentElementID) return item;
    });

    // if(item.id === current elementId) return {id: item.id, status: "completed", value: item.value}
    // else return item
    saveTodos(newTodos);
    renderItems(newTodos);
  }

  if (event.target.className === "done-btn") {
    const currentElementID = event.target
      .closest("li")
      .getAttribute("data-todo-id");
    let newTodos = getTodos().map((item) => {
      if (currentElementID === item.id) {
        return {
          id: item.id,
          status: item.status === "completed" ? "active" : "completed",
          value: item.value,
        };
      } else return item;
    });
    saveTodos(newTodos);
    renderItems(newTodos);
  }
}

todoList.addEventListener("click", todoListHandler);

clearComplete.addEventListener("click", () => {
  let newTodos = getTodos().filter((item) => item.status !== "completed");
  saveTodos(newTodos);
  renderItems(newTodos);
});

filters.addEventListener("click", (event) => {
  if (event.target.name === "filters") {
    if (event.target.value === "Completed") {
      let newTodos = getTodos().filter((item) => item.status === "completed");
      renderItems(newTodos);
    }

    if (event.target.value === "Active") {
      let newTodos = getTodos().filter((item) => item.status === "active");
      renderItems(newTodos);
    }

    if (event.target.value === "All") {
      let newTodos = getTodos();

      renderItems(newTodos);
    }
    // console.log(event.target.value);
  }
});

renderItems(getTodos());
