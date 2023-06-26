const todoList = document.getElementById('todo-list') as HTMLUListElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoInput = document.getElementById('todo-input') as HTMLInputElement;

const createTodo = (todoText: string): HTMLLIElement => {
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

  const todoText: string = todoInput.value;

  const todoListItem: HTMLLIElement = createTodo(todoText);

  todoList.appendChild(todoListItem);

  todoInput.value = "";
});
