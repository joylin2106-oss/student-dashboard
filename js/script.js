const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTask");
const taskList = document.getElementById("taskList");
const themeToggle = document.getElementById("themeToggle");

// Load data when page loads
document.addEventListener("DOMContentLoaded", function () {
    loadTasks();

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
    }
});

addTaskBtn.addEventListener("click", function () {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = {
        text: taskText,
        completed: false
    };

    addTaskToDOM(task);
    saveTask(task);
    taskInput.value = "";
});

// Create task in UI
function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.textContent = task.text;

    if (task.completed) {
        li.style.textDecoration = "line-through";
    }

    // Mark completed
    li.addEventListener("click", function () {
        task.completed = !task.completed;
        li.style.textDecoration = task.completed ? "line-through" : "none";
        updateTasks();
    });

    // Delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function (e) {
        e.stopPropagation();
        li.remove();
        deleteTask(task.text);
    });

    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Save task
function saveTask(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks
function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

// Update tasks
function updateTasks() {
    let tasks = [];
    document.querySelectorAll("#taskList li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            completed: li.style.textDecoration === "line-through"
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Delete task
function deleteTask(taskText) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(task => task.text !== taskText);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Theme toggle
themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
});
