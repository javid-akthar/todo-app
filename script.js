let todoForm = document.querySelector(".todo-form");
let ul = document.querySelector("ul");
let allFilter = document.querySelector(".all-todos");
let uncompleted = document.querySelector(".uncompleted-todos");
let completed = document.querySelector(".completed-todos");
let taskLeftContainer = document.querySelector(".task-left-container");
// let completeAllTasks = document.querySelector(".complete-all-tasks");

let listAll = true;
let listUncompleted = false;
let listCompleted = false;
var todos = [];
let count = 0;

allFilter.setAttribute("style", "opacity:1");
uncompleted.setAttribute("style", "opacity:0.5");
completed.setAttribute("style", "opacity:0.5");

// completeAllTasks.addEventListener('click', (event)=>{
//     todos.forEach((todo, index) =>{
//         var obj = todo;
//         if(obj.completed == false){
//             obj.completed = true;
//             todos[index] = obj;
//         }
//     });
//     localStorage.setItem('todos', JSON.stringify(todos));
//     clear();
//     renderTodos(todos);
// });

allFilter.addEventListener('click', (event) =>{
     listAll = true;
     listUncompleted = false;
     listCompleted = false;
     allFilter.setAttribute("style", "opacity:1");
     uncompleted.setAttribute("style", "opacity:0.5");
     completed.setAttribute("style", "opacity:0.5");
     clear();
     renderTodos(todos);
     console.log(listAll, listUncompleted, listCompleted);
});

uncompleted.addEventListener('click', (event) =>{
    listAll = false;
    listUncompleted = true;
    listCompleted = false;
    allFilter.setAttribute("style", "opacity:0.5");
    uncompleted.setAttribute("style", "opacity:1");
    completed.setAttribute("style", "opacity:0.5");
    clear();
    renderTodos(todos);
    console.log(listAll, listUncompleted, listCompleted);
});

completed.addEventListener('click', (event) =>{
    listAll = false;
    listUncompleted = false;
    listCompleted = true;
    allFilter.setAttribute("style", "opacity:0.5");
    uncompleted.setAttribute("style", "opacity:0.5");
    completed.setAttribute("style", "opacity:1");
    clear();
    renderTodos(todos);
    console.log(listAll, listUncompleted, listCompleted);
});

var storedTodos = localStorage.getItem("todos");

if(storedTodos){
    
    var parsedStoredTodos = JSON.parse(storedTodos);
    todos = parsedStoredTodos;
    renderTodos(todos);
}

function createElement(value, currIndex, completionStatus){
    var li = document.createElement("li");

    var div = document.createElement("div");
    div.setAttribute("class", "actions-on-list");

    var i1 = document.createElement("i");
    if(completionStatus){
        i1.setAttribute("class", "fa-regular fa-square-check");
    }else if(!completionStatus){
        i1.setAttribute("class", "fa-regular fa-square");
    }

    i1.addEventListener('click', (event) =>{
        let obj = todos[currIndex];
        obj.completed = !obj.completed;
        todos[currIndex] = obj;
        localStorage.setItem('todos', JSON.stringify(todos));
        clear();
        renderTodos(todos);
    });

    var i2 = document.createElement("i");
    i2.setAttribute("class", "fa-solid fa-trash");

    i2.addEventListener('click', function(event){
        todos.splice(currIndex, 1);
            localStorage.setItem('todos',JSON.stringify(todos));
            console.log('currIndex', currIndex);
            storedTodos = localStorage.getItem("todos");

            var child = ul.lastElementChild; 
            while (child) {
               ul.removeChild(child);
               child = ul.lastElementChild;
             }

            if(storedTodos){
                var parsedStoredTodos = JSON.parse(storedTodos);
                todos = parsedStoredTodos;
                 renderTodos(todos);
            }
        
    });

    var span = document.createElement("span");
    span.setAttribute("style","width: 72%; padding: 0.5rem 0.5rem;");
    var node = document.createTextNode(value);
    span.appendChild(node);
    li.appendChild(span);

    if(completionStatus){
        var span2 = document.createElement("span");
        // text-shadow: 0.1px 0.1px 5px green;
    span2.setAttribute("style","color: green;");
    var node2 = document.createTextNode("Completed");
    span2.appendChild(node2);
    li.appendChild(span2);

    }else if(!completionStatus){
        var span2 = document.createElement("span");
        span2.setAttribute("style","color: red;");
        var node2 = document.createTextNode("Uncompleted");
        span2.appendChild(node2);
        li.appendChild(span2);
    }
 

    div.appendChild(i1);
    div.appendChild(i2);
    li.appendChild(div);
    return li;
}

function renderTodos(todos){
     count = 0;
    todos.forEach((todo, currIndex) => {
        if(!todo.completed){
            count++;
        }
       if(listAll){
        if(todo.completed){
            var li = createElement(todo.value, currIndex,true)
            ul.appendChild(li);
        }else if(!todo.completed){
            var li = createElement(todo.value, currIndex, false)
            ul.appendChild(li);
        }
       }else if(listUncompleted){
        if(!todo.completed){
          var li = createElement(todo.value, currIndex, false)
          ul.appendChild(li);
        }
        }else if(listCompleted){
           if(todo.completed){
            var li = createElement(todo.value, currIndex, true);
            ul.appendChild(li);  
           } 
       }
    });
    taskLeftContainer.innerHTML = `<span class="task-left-count">${count}</span>
                                    <span>tasks left</span> `;
}

function clear(){
    var child = ul.lastElementChild; 
    while (child) {
        ul.removeChild(child);
        child = ul.lastElementChild;
    }
}

todoForm.addEventListener("submit", function(event){
    event.preventDefault();
    let val = todoForm.todo.value;
    todos.push({
        value : todoForm.todo.value,
        completed: false
    });
    localStorage.setItem("todos",JSON.stringify(todos));
    todoForm.todo.value = "";
    clear();
    renderTodos(todos);
    // var li = createElement(val, todos.length-1, false)
    // ul.appendChild(li);
    // count++;
    // taskLeftContainer.innerHTML = `<span class="task-left-count">${count}</span>
    //                                 <span>tasks left</span> `;

    // ul.insertAdjacentHTML('afterend', li);
    // sec.insertAdjacentHTML('afterend', `<div class='behind-element'>Behind Element</div>`)


})