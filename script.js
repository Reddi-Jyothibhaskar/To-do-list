const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

// Load tasks on page load
window.addEventListener('DOMContentLoaded', loadTasks);
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') addTask();
});

// Get tasks from localStorage
function getTasks() {
  return JSON.parse(localStorage.getItem('tasks')) || [];
}

// Save tasks to localStorage
function saveTasks(tasks) {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load and render tasks
function loadTasks() {
  renderTasks(getTasks());
}

// Add a new task
function addTask() {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const tasks = getTasks();
  tasks.push({ text: taskText, done: false });
  saveTasks(tasks);
  taskInput.value = '';
  renderTasks(tasks);
}

// Render all tasks
function renderTasks(tasks) {
  taskList.innerHTML = '';
  tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    if (task.done) span.classList.add('done');

    const priority = document.createElement('span');
    priority.className = 'task-priority';
    priority.textContent = `#${index + 1}`;

    const btns = document.createElement('div');
    btns.className = 'task-buttons';

    const doneBtn = document.createElement('button');
    doneBtn.className = 'done-btn';
    doneBtn.textContent = 'Done';
    doneBtn.onclick = () => toggleDone(index);

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => editTask(index);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => deleteTask(index);

    const priorityBtn = document.createElement('button');
    priorityBtn.className = 'priority-btn';
    priorityBtn.textContent = '↑ Priority';
    priorityBtn.onclick = () => moveUp(index);

    btns.appendChild(doneBtn);
    btns.appendChild(editBtn);
    btns.appendChild(deleteBtn);
    btns.appendChild(priorityBtn);

    li.appendChild(priority);
    li.appendChild(span);
    li.appendChild(btns);
    taskList.appendChild(li);
  });
}

// Toggle done state
function toggleDone(index) {
  const tasks = getTasks();
  tasks[index].done = !tasks[index].done;
  saveTasks(tasks);
  renderTasks(tasks);
}

// Edit task
function editTask(index) {
  const tasks = getTasks();
  const newText = prompt("Edit your task:", tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText.trim();
    saveTasks(tasks);
    renderTasks(tasks);
  }
}

// Delete task
function deleteTask(index) {
  const tasks = getTasks();
  tasks.splice(index, 1);
  saveTasks(tasks);
  renderTasks(tasks);
}

// Move task up to set higher priority
function moveUp(index) {
  const tasks = getTasks();
  if (index > 0) {
    [tasks[index], tasks[index - 1]] = [tasks[index - 1], tasks[index]];
    saveTasks(tasks);
    renderTasks(tasks);
  }
}
