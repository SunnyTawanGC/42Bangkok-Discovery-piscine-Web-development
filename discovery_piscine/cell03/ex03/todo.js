window.onload = function() {
    loadTodos();
};

function newTodo() {
    let text = prompt("Enter new TO DO:");
    if (text && text.trim() !== "") {
        addTodoToDOM(text);
        saveTodos();
    }
}

function addTodoToDOM(text) {
    let list = document.getElementById("ft_list");
    let div = document.createElement("div");

    div.className = "todo-item";
    div.innerHTML = text;

    div.onclick = function() {
        if (confirm("Do you want to remove this TO DO?")) {
            div.remove();
            saveTodos(); 
        }
    };

    list.prepend(div);
}

function saveTodos() {
    let list = document.getElementById("ft_list");
    let todos = [];
    
    for (let i = 0; i < list.children.length; i++) {
        todos.unshift(list.children[i].innerHTML);
    }


    document.cookie = "ft_list=" + encodeURIComponent(JSON.stringify(todos)) + "; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/";
}

function loadTodos() {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf("ft_list=") == 0) {
            let jsonStr = cookie.substring("ft_list=".length, cookie.length);
            try {
                let todos = JSON.parse(decodeURIComponent(jsonStr));
                for (let j = 0; j < todos.length; j++) {
                    addTodoToDOM(todos[j]);
                }
            } catch (e) {
                console.log("Error parsing cookie");
            }
        }
    }
}