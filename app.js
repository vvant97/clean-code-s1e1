const taskInput = document.querySelector('.tasks__new-task-input');
const addButton = document.querySelector('.tasks__new-task-button');
const incompleteTaskHolder = document.querySelector('.tasks__list-todo');
const completedTasksHolder = document.querySelector('.tasks__list-completed');

function createNewTaskElement(taskString) {
  const listItem = document.createElement('li');
  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  listItem.className = 'tasks__item';
  checkBox.className = 'tasks__input tasks__input-checkbox';
  checkBox.setAttribute('type', 'checkbox');
  label.className = 'tasks__label grow';
  label.textContent = taskString;
  editInput.className = 'tasks__input tasks__input-text grow';
  editInput.setAttribute('type', 'text');
  editButton.className = 'tasks__edit-button button';
  editButton.textContent = 'Edit';
  deleteButtonImg.className = 'tasks__remove-image';
  deleteButtonImg.setAttribute('src', './remove.svg');
  deleteButton.className = 'tasks__remove-button button';
  deleteButton.append(deleteButtonImg);

  [checkBox, label, editInput, editButton, deleteButton].forEach(e => {
    listItem.append(e);
  });

  return listItem;
}

function addTask() {
  if (!taskInput.value) return;

  const listItem = createNewTaskElement(taskInput.value);

  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem, taskCompleted);
  taskInput.value = '';
}

function editTask() {
  const listItem = this.parentElement;
  const editInput = listItem.querySelector('.tasks__input-text');
  const label = listItem.querySelector('.tasks__label');
  const editBtn = listItem.querySelector('.button');
  const containsClass = listItem.classList.contains('editable');
  
  if (containsClass) {
    label.textContent = editInput.value;
    editBtn.textContent = 'Edit';
    editInput.classList.remove('tasks__input-editable');
    label.classList.remove('tasks__label-editable');
  } else {
    editInput.value = label.textContent;
    editBtn.textContent = 'Save';
    editInput.classList.add('tasks__input-editable');
    label.classList.add('tasks__label-editable');
  }

  listItem.classList.toggle('editable');
}

function deleteTask() {
  const listItem = this.parentElement;

  listItem.remove();
}

function taskCompleted() {
  const listItem = this.parentElement;
  const label = listItem.querySelector('.tasks__label');

  label.classList.add('tasks__completed-task-label');
  completedTasksHolder.append(listItem);
  bindTaskEvents(listItem, taskIncomplete);
}

function taskIncomplete() {
  const listItem = this.parentElement;
  const label = listItem.querySelector('.tasks__label');

  label.classList.remove('tasks__completed-task-label');
  incompleteTaskHolder.append(listItem);
  bindTaskEvents(listItem,taskCompleted);
}

addButton.addEventListener('click', addTask);

function bindTaskEvents(taskListItem, checkBoxEventHandler) {
  const checkBox = taskListItem.querySelector('.tasks__input-checkbox');
  const editButton = taskListItem.querySelector('.tasks__edit-button');
  const deleteButton = taskListItem.querySelector('.tasks__remove-button');

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = checkBoxEventHandler;
}

function bindAllTasksEvents(elements, handler) {
  for (let i = 0; i < elements.length; i++) {
    bindTaskEvents(elements[i], handler);
  }
}

bindAllTasksEvents(incompleteTaskHolder.children, taskCompleted);
bindAllTasksEvents(completedTasksHolder.children, taskIncomplete);
