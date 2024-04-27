let tasks = [];

// Check if there are tasks in localStorage
const storedTasks = localStorage.getItem('tasks');
if (storedTasks) {
    tasks = JSON.parse(storedTasks);
    renderTasks();
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText !== '') {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
        saveTasks();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
    saveTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
    saveTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    tasks.forEach((task, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}" onclick="toggleTask(${index})">${task.text}</span>
            <button onclick="deleteTask(${index})">Delete</button>
        `;
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Service Worker Registration
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(reg => {
            console.log('Service Worker registered');
        })
        .catch(error => {
            console.error('Service Worker registration failed:', error);
        });
}

// Function to apply a theme
function applyTheme(theme) {
    document.body.classList.remove('light-theme', 'dark-theme');
    document.body.classList.add(theme);
}

// Example function to handle theme selection
function handleThemeChange() {
    // Get the selected theme from user input (e.g., from a dropdown or buttons)
    // For example, you can prompt the user for a theme or get the theme from a button click
    const selectedTheme = prompt("Enter 'light' for light theme or 'dark' for dark theme:");

    // Apply the selected theme
    if (selectedTheme === 'light') {
        applyTheme('light-theme');
    } else if (selectedTheme === 'dark') {
        applyTheme('dark-theme');
    } else {
        alert('Invalid theme selection');
    }
}

// Call the theme change handler on page load or user interaction
document.addEventListener('DOMContentLoaded', () => {
    handleThemeChange(); // Initialize with a default theme or prompt the user
});
