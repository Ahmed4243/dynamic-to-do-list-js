document.addEventListener('DOMContentLoaded', function () {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from Local Storage on page load
    loadTasks();

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don’t resave to LS
    }

    // Function to add a new task
    function addTask(taskText = null, save = true) {
        const text = taskText || taskInput.value.trim();

        if (text === "") {
            alert("Please enter a task.");
            return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = text;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add("remove-btn");

        // Remove the task from DOM and Local Storage
        removeButton.onclick = function () {
            taskList.removeChild(listItem);
            removeTaskFromStorage(text);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (save) {
            const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
            storedTasks.push(text);
            localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        taskInput.value = "";
    }

    // Remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks = storedTasks.filter(task => task !== taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }

    // Add event listeners
    addButton.addEventListener('click', () => addTask());

    taskInput.addEventListener('keypress', function (event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });
});
