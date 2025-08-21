const input = document.querySelector("input");
const addBtn = document.querySelector(".add");
const boxlist = document.querySelector(".list");

function updateListVisibility() {
  boxlist.style.display = boxlist.children.length === 0 ? "none" : "grid";
}

// Simpan semua todo ke localStorage
function saveTodos() {
  const todos = [];
  boxlist.querySelectorAll(".todo-item").forEach((todo) => {
    const text = todo.querySelector("span").textContent;
    const done = todo.querySelector("span").classList.contains("done");
    todos.push({ text, done });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

// Load todo dari localStorage
function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach((t) => createTodo(t.text, t.done));
  updateListVisibility();
}

// Fungsi buat item todo
function createTodo(text, done = false) {
  const todo = document.createElement("div");
  todo.classList.add("todo-item");

  const span = document.createElement("span");
  span.textContent = text;
  if (done) {
    span.classList.add("done");
  }

  const checkBtn = document.createElement("button");
  checkBtn.textContent = "✔";
  checkBtn.classList.add("check");
  if (done) checkBtn.disabled = true;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "✖";
  deleteBtn.classList.add("delete");

  todo.appendChild(span);
  todo.appendChild(checkBtn);
  todo.appendChild(deleteBtn);
  boxlist.appendChild(todo);

  updateListVisibility();

  // event ceklis
  checkBtn.addEventListener("click", () => {
    span.classList.add("done");
    checkBtn.disabled = true;
    saveTodos();
  });

  // event hapus
  deleteBtn.addEventListener("click", () => {
    todo.remove();
    updateListVisibility();
    saveTodos();
  });

  saveTodos();
}

// Tambah todo baru
function addTodo() {
  const text = input.value.trim();
  if (text === "") return;
  createTodo(text, false);
  input.value = "";
}

addBtn.addEventListener("click", addTodo);

// Load pertama kali
loadTodos();
