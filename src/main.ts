import './style.css';

function init() {
  const todoList = document.getElementById('todo-list') as HTMLUListElement | null;
  const todoForm = document.getElementById('todo-form') as HTMLFormElement | null;
  const todoInput = document.getElementById('todo-input') as HTMLInputElement | null;

  if (!todoList) throw new Error("Could not find element with id todo-list");
  if (!todoForm) throw new Error("Could not find element with id todo-form");
  if (!todoInput) throw new Error("Could not find element with id todo-input");

  return { todoList, todoForm, todoInput };
}

const { todoList, todoForm, todoInput } = init();

function createTodo(todoText: string): HTMLLIElement {
  const li: HTMLLIElement = document.createElement('li');
  const deleteBtn: HTMLButtonElement = document.createElement('button');

  li.innerText = todoText;
  deleteBtn.innerText = 'X';
  deleteBtn.addEventListener('click', () => todoList.removeChild(li));
  li.appendChild(deleteBtn);

  return li;
}

todoForm.addEventListener('submit', e => {
  e.preventDefault();

  const todoText: string = todoInput.value.trim();

  if (todoText.length === 0) return;

  const todoListItem: HTMLLIElement = createTodo(todoText);

  todoList.appendChild(todoListItem);

  todoInput.value = "";
});
