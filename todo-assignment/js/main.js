const tasksContainer = document.querySelector('.controller .tasks');
const taskInput = document.getElementById('task-input');
const completedTasks = document.getElementById("completed-tasks");
const activeTasks = document.getElementById("active-tasks");
const allTasks = document.getElementById("all-tasks");
const tasksLeft = document.getElementById('items-left');
const clearComplete = document.getElementById("clearAll");

let tasks = [];
let tasksCounter = 0;

const percentLoad = () => {
    let counter = 0;
    tasks.forEach((task) => {
        if (!task.status) {
            counter++;
        }
    });
    tasksLeft.innerText = counter;
}

document.addEventListener("DOMContentLoaded", (e) => {
    let storedTasks = JSON.parse(localStorage.getItem("tasks"));
    let storedCounter = JSON.parse(localStorage.getItem("tasksCounter"));
    if (storedTasks != null) {
        tasks = storedTasks;
        tasksCounter = storedCounter;
        buildAll();
    }
    percentLoad();
});

const createTask = (task) => {
    const taskDiv = `
    <div class="task" id="${task.id}">
        <div class="custom-check${task.status ? " check" : ""}">
            <span id="${task.id}"></span>
        </div>
        <span class="task-title">${task.title}</span>
        <div class="close"><img class="task-close" src="images/icon-cross.svg"></div>
    </div>
        `;
    return taskDiv;
};

document.addEventListener('keydown', (e) => {
    // add Task
    if (e.key === 'Enter' && taskInput.value !== '') {
        console.log(taskInput.value);
        let task = {
            id: tasksCounter,
            title: taskInput.value,
            status: false,
        };
        tasksCounter++;
        if (allTasks.classList.contains("active") || activeTasks.classList.contains("active")) {
            const taskNode = createTask(task);
            tasksContainer.innerHTML += taskNode;
        }
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('tasksCounter', JSON.stringify(tasksCounter));
        taskInput.value = "";
        percentLoad();
    }
});

document.addEventListener('click', (e) => {
    console.log("e.target");
    console.log(e.target);
    console.log(e.target.classList);
    // deleting Task
    if (e.target.classList.contains('task-close')) {
        e.target.parentElement.parentElement.remove();
        let id = e.target.parentElement.parentElement.id;
        console.log(tasks);
        tasks.forEach((task, index) => {
            if (id == task.id) {
                id = index;
            }
        });
        tasks.splice(id, 1);
        console.log(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('tasksCounter', JSON.stringify(tasksCounter));
        percentLoad();
    }
    // Mark Task Compeleted
    else if (e.target.parentElement.classList.contains('custom-check')) {
        e.target.parentElement.classList.toggle('check');
        let id = e.target.id;
        console.log(id);
        tasks.forEach((task, index) => {
            if (id == task.id) {
                id = index;
            }
        });
        console.log(tasks[id]);
        tasks[id].status = !tasks[id].status;
        console.log(tasks[id]);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        percentLoad();
    }
    // Edit Task Title
    else if (e.target.classList.contains('task-title')) {
        console.log("tasks[e.target.id]");
        let id = e.target.parentElement.id;
        tasks.forEach((task, index) => {
            if (id == task.id) {
                id = index;
            }
        });
        tasks[id].title = prompt('Edit your task', tasks[id].title);
        e.target.textContent = tasks[id].title;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        localStorage.setItem('tasksCounter', JSON.stringify(tasksCounter));
    }
});

completedTasks.addEventListener('click', (e) => {
    buildCompleted();
});

activeTasks.addEventListener('click', (e) => {
    buildActive();
});

allTasks.addEventListener('click', (e) => {
    buildAll();
});

clearComplete.addEventListener("click", (e) => {
    console.log("all tasks");
    let filteredTasks = [];
    tasks.forEach((task) => {
        console.log(task);
        if (!task.status) {
            filteredTasks.push(task);
        }
    });
    tasks = filteredTasks;
    console.log("done tasks");
    console.log(tasks);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('tasksCounter', JSON.stringify(tasksCounter));
    allTasks.click();
});

const buildAll = () => {
    activeTasks.classList.remove("active");
    allTasks.classList.add("active");
    completedTasks.classList.remove("active");
    tasksContainer.innerHTML = "";
    tasks.forEach((task) => {
        console.log(task);
        let taskNode = createTask(task);
        tasksContainer.innerHTML += taskNode;
    });
};

const buildActive = () => {
    activeTasks.classList.add("active");
    allTasks.classList.remove("active");
    completedTasks.classList.remove("active");
    tasksContainer.innerHTML = "";
    tasks.forEach((task) => {
        console.log(task);
        if (!task.status) {
            let taskNode = createTask(task);
            tasksContainer.innerHTML += taskNode;
        }
    });
};

const buildCompleted = () => {
    activeTasks.classList.remove("active");
    allTasks.classList.remove("active");
    completedTasks.classList.add("active");
    tasksContainer.innerHTML = "";
    tasks.forEach((task) => {
        console.log(task);
        if (task.status) {
            let taskNode = createTask(task);
            tasksContainer.innerHTML += taskNode;
        }
    });
}

const mode = document.getElementById('toggle');

mode.addEventListener('click', () => {
    document.body.classList.toggle('light');
});