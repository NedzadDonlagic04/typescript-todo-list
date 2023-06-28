import './style.css';

let id: number = 0;

interface Todo {
  id: number,
  text: string
}

function createTodo(todoText: string, todoID: number): HTMLLIElement {
  const li: HTMLLIElement = document.createElement('li');
  const deleteBtn: HTMLButtonElement = document.createElement('button');

  li.innerText = todoText;
  deleteBtn.innerText = 'X';
  deleteBtn.addEventListener('click', () => {
    todoList.removeChild(li);

    const index = todos.findIndex(todo => todo.id === todoID);
    todos.splice(index, 1);
    localStorage.setItem('todos', JSON.stringify(todos));
  });
  li.appendChild(deleteBtn);

  return li;
}

function loadTodoList(todoList: HTMLUListElement, todos: Todo[]) {
  for (const todo of todos) {
    const li: HTMLLIElement = createTodo(todo.text, todo.id);

    todoList.appendChild(li);
  }
}

function init() {
  const todoList = document.getElementById('todo-list') as HTMLUListElement | null;
  const todoForm = document.getElementById('todo-form') as HTMLFormElement | null;
  const todoInput = document.getElementById('todo-input') as HTMLInputElement | null;
  let todos: Todo[];

  if (!todoList) throw new Error("Could not find element with id todo-list");
  if (!todoForm) throw new Error("Could not find element with id todo-form");
  if (!todoInput) throw new Error("Could not find element with id todo-input");

  const todosStringed: string | null = localStorage.getItem('todos');

  if (todosStringed) {
    todos = JSON.parse(todosStringed);
    id = todos[todos.length - 1].id + 1;

    loadTodoList(todoList, todos);
  } else {
    todos = [];
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  return { todoList, todoForm, todoInput, todos };
}

const { todoList, todoForm, todoInput, todos } = init();

todoForm.addEventListener('submit', e => {
  e.preventDefault();

  const todoText: string = todoInput.value.trim();

  if (todoText.length === 0) return;

  const todoListItem: HTMLLIElement = createTodo(todoText, id);

  todoList.appendChild(todoListItem);
  todos.push({ text: todoText, id: id });
  localStorage.setItem('todos', JSON.stringify(todos));

  todoInput.value = "";
  id++;
});
