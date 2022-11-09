var todos = [];
let todoForm = document.querySelector(".todo-form");
let ul = document.querySelector("ul");

var storedTodos = localStorage.getItem("todos");

if(storedTodos){
    
    var parsedStoredTodos = JSON.parse(storedTodos);
    todos = parsedStoredTodos;
    renderTodos(todos);
}

function renderTodos(todos){
    todos.forEach((todo, currIndex) => {
        
        var li = document.createElement("li");

        var div = document.createElement("div");
        div.setAttribute("class", "actions-on-list");
    
        var i1 = document.createElement("i");
        i1.setAttribute("class", "fa-solid fa-check");
    
        var i2 = document.createElement("i");
        i2.setAttribute("class", "fa-solid fa-trash");

        i2.addEventListener('click', function(event){
            // event.target.parentElement.parentElement.remove();
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
        var node = document.createTextNode(todo.value);
        span.appendChild(node);
    
        li.appendChild(span);
    
        div.appendChild(i1);
        div.appendChild(i2);
        li.appendChild(div);
        ul.appendChild(li);

    });
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

    var li = document.createElement("li");

    var div = document.createElement("div");
    div.setAttribute("class", "actions-on-list");

    var i1 = document.createElement("i");
    i1.setAttribute("class", "fa-solid fa-check");

    var i2 = document.createElement("i");
    i2.setAttribute("class", "fa-solid fa-trash");

    i2.addEventListener('click', function(event){
        event.target.parentElement.remove();
        
    });

    var span = document.createElement("span");
    var node = document.createTextNode(val);
    span.appendChild(node);

    li.appendChild(span);

    div.appendChild(i1);
    div.appendChild(i2);
    li.appendChild(div);
    ul.appendChild(li);
    

})