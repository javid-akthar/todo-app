let todoForm = document.querySelector(".todo-form");
let ul = document.querySelector("ul");
let allFilter = document.querySelector(".all-todos");
let uncompleted = document.querySelector(".uncompleted-todos");
let completed = document.querySelector(".completed-todos");
let taskLeftContainer = document.querySelector(".task-left-container");
const flashContainer = document.getElementById('flashbar-container');
let listAll = true;
let listUncompleted = false;
let listCompleted = false;
var todos = [];
let count = 0;

allFilter.setAttribute("style", "opacity:1");
uncompleted.setAttribute("style", "opacity:0.5");
completed.setAttribute("style", "opacity:0.5");

// method to list both completed and uncompleted tasks
allFilter.addEventListener('click', (event) => {
    listAll = true;
    listUncompleted = false;
    listCompleted = false;
    allFilter.setAttribute("style", "opacity:1");
    uncompleted.setAttribute("style", "opacity:0.5");
    completed.setAttribute("style", "opacity:0.5");
    clear();
    renderTodos(todos);
});

// method to list uncompleted tasks
uncompleted.addEventListener('click', (event) => {
    listAll = false;
    listUncompleted = true;
    listCompleted = false;
    allFilter.setAttribute("style", "opacity:0.5");
    uncompleted.setAttribute("style", "opacity:1");
    completed.setAttribute("style", "opacity:0.5");
    clear();
    renderTodos(todos);
});

// method to list completed tasks
completed.addEventListener('click', (event) => {
    listAll = false;
    listUncompleted = false;
    listCompleted = true;
    allFilter.setAttribute("style", "opacity:0.5");
    uncompleted.setAttribute("style", "opacity:0.5");
    completed.setAttribute("style", "opacity:1");
    clear();
    renderTodos(todos);
});

var storedTodos = localStorage.getItem("todos");

// once the page loads this method will check if theres any previous existing data present
// in local storage and lists down those tasks
if (storedTodos) {
    var parsedStoredTodos = JSON.parse(storedTodos);
    todos = parsedStoredTodos;
    renderTodos(todos);
}

// if a new task is added this method will add that to tasks list and add the necessary listeners
function createElement(value, currIndex, completionStatus) {
    var li = document.createElement("li");

    var div = document.createElement("div");
    div.setAttribute("class", "actions-on-list");

    var i1 = document.createElement("i");
    if (completionStatus) {
        i1.setAttribute("class", "fa-regular fa-square-check");
    } else if (!completionStatus) {
        i1.setAttribute("class", "fa-regular fa-square");
    }

    // method to check and uncheck a task
    i1.addEventListener('click', (event) => {
        let obj = todos[currIndex];
        if(obj.completed){
            flashbar('warning','Task moved to pending status', 3000);
        }else if(!obj.completed){
            flashbar('success','Task moved to completed status', 3000);
        }
        obj.completed = !obj.completed;
        todos[currIndex] = obj;
        localStorage.setItem('todos', JSON.stringify(todos));
        clear();
        renderTodos(todos);
    });

    var i2 = document.createElement("i");
    i2.setAttribute("class", "fa-solid fa-trash");

    // method to delete the task from the list permanently
    i2.addEventListener('click', function (event) {
        todos.splice(currIndex, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        storedTodos = localStorage.getItem("todos");

        var child = ul.lastElementChild;
        while (child) {
            ul.removeChild(child);
            child = ul.lastElementChild;
        }

        if (storedTodos) {
            var parsedStoredTodos = JSON.parse(storedTodos);
            todos = parsedStoredTodos;
            renderTodos(todos);
        }
        flashbar('warning','Task Deleted from list', 3000);

    });

    var span = document.createElement("span");
    span.setAttribute("style", "width: 72%; padding: 0.5rem 0.5rem;");
    var node = document.createTextNode(value);
    span.appendChild(node);
    li.appendChild(span);

    // this part will notify the status of task whether completed or pending
    if (completionStatus) {
        var span2 = document.createElement("span");
        span2.setAttribute("style", "color: green;");
        var node2 = document.createTextNode("Completed");
        span2.appendChild(node2);
        li.appendChild(span2);
    } else if (!completionStatus) {
        var span2 = document.createElement("span");
        span2.setAttribute("style", "color: red;");
        var node2 = document.createTextNode("Pending");
        span2.appendChild(node2);
        li.appendChild(span2);
    }

    div.appendChild(i1);
    div.appendChild(i2);
    li.appendChild(div);
    return li;
}

// method hels to list down all tasks
function renderTodos(todos) {
    count = 0;
    todos.forEach((todo, currIndex) => {
        if (!todo.completed) {
            count++;
        }
        if (listAll) {
            if (todo.completed) {
                var li = createElement(todo.value, currIndex, true)
                ul.appendChild(li);
            } else if (!todo.completed) {
                var li = createElement(todo.value, currIndex, false)
                ul.appendChild(li);
            }
        } else if (listUncompleted) {
            if (!todo.completed) {
                var li = createElement(todo.value, currIndex, false)
                ul.appendChild(li);
            }
        } else if (listCompleted) {
            if (todo.completed) {
                var li = createElement(todo.value, currIndex, true);
                ul.appendChild(li);
            }
        }
    });
    taskLeftContainer.innerHTML = `<span class="task-left-count">${count}</span>
                                    <span>tasks left</span> `;
}

// method helps to clear the tasks so that newly added tasks will be proper indexing
function clear() {
    var child = ul.lastElementChild;
    while (child) {
        ul.removeChild(child);
        child = ul.lastElementChild;
    }
}

// this will get the input from the text and add it the tasks list
todoForm.addEventListener("submit", function (event) {
    event.preventDefault();
    let val = todoForm.todo.value;
    todos.push({
        value: todoForm.todo.value,
        completed: false
    });
    localStorage.setItem("todos", JSON.stringify(todos));
    todoForm.todo.value = "";
    clear();
    renderTodos(todos);
    flashbar('message','Task added to list', 3000);
})

function flashbar(type, msg, time){
    const para = document.createElement('P');
    para.classList.add('flashbar');
    para.innerHTML = `${msg} <span> &times </span>`;
    if(type ==='message'){
        para.classList.add('message');
    }else if(type ==='success'){
        para.classList.add('success');
    }
    else if(type ==='warning'){
        para.classList.add('warning');
    }
    flashContainer.appendChild(para);
    para.classList.add('fadeout');
    setTimeout(()=>{
            flashContainer.removeChild(para)
    }, time)
}

