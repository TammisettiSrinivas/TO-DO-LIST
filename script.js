// Initialize an empty array to hold tasks
let tasks = [];

// Load stored tasks from local storage when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));

  if (storedTasks) {
    tasks = storedTasks;
    updateTasksList();
    updateStats();
  }
});

// Function to save tasks to local storage
const saveTask = () => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

// Function to add a new task
const addTask = () => {
  const taskInput = document.getElementById("taskInput");
  const text = taskInput.value.trim();

  if (text) {
    tasks.push({ text: text, completed: false });
    taskInput.value = ""; // Clear input field after adding
    updateTasksList();
    updateStats();
    saveTask();
  }
};

// Function to update the statistics of tasks
const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
  const progressBar = document.getElementById("progress");
  progressBar.style.width = `${progress}%`;
  document.getElementById("numbers").innerHTML = `${completedTasks} / ${totalTasks}`;
};

// Function to toggle the completion status of a task
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed;
  updateTasksList();
  updateStats();
  saveTask();
};

// Function to delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  updateTasksList();
  updateStats();
  saveTask();
};

// Function to edit a task
const editTask = (index) => {
  const newText = prompt("Edit your task:", tasks[index].text);
  
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText; // Update the task's text
    updateTasksList(); // Update the displayed task list
    updateStats(); // Update statistics
    saveTask(); // Save the updated tasks to local storage
  }
};

// Function to update the displayed list of tasks
const updateTasksList = () => {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = ""; // Clear the existing list

  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
        <div class="taskItem">
          <div class="task ${task.completed ? "completed" : ""}">
            <input type="checkbox" class="checkbox" ${
              task.completed ? "checked" : ""
            } onchange="toggleTaskComplete(${index})" />
            <p>${task.text}</p>
          </div>
          <div class="icons">
            <img src="./images/edit.png" onClick="editTask(${index})" />
            <img src="./images/bin.png" onClick="deleteTask(${index})" />
          </div>
        </div>
      `;
    taskList.appendChild(listItem); // Add the new list item to the task list
  });
};

// Add event listener to the "Add Task" button
document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault(); // Prevent form submission
  addTask(); // Call the addTask function to add a new task
});
