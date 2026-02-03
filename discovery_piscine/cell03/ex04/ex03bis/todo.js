$(document).ready(function() {
    loadTodos();

    $('#newBtn').click(function() {
        let text = prompt("Enter new TO DO:");
        if (text && text.trim() !== "") {
            addTodo(text);
            saveTodos();
        }
    });

    function addTodo(text) {
        let $div = $('<div>').addClass('todo-item').text(text);
        
        $div.click(function() {
            if (confirm("Remove this TO DO?")) {
                $(this).remove();
                saveTodos();
            }
        });

        $('#ft_list').prepend($div);
    }

    function saveTodos() {
        let todos = [];
        $('#ft_list').children().each(function() {
            todos.unshift($(this).text());
        });
        document.cookie = "ft_list=" + encodeURIComponent(JSON.stringify(todos)) + "; expires=Thu, 01 Jan 2099 00:00:00 UTC; path=/";
    }

    function loadTodos() {
        let cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            let cookie = cookies[i].trim();
            if (cookie.indexOf("ft_list=") == 0) {
                let jsonStr = cookie.substring(8);
                try {
                    let todos = JSON.parse(decodeURIComponent(jsonStr));
                    $.each(todos, function(index, value) {
                        addTodo(value);
                    });
                } catch (e) {}
            }
        }
    }
});