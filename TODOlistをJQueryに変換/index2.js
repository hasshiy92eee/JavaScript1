'use strict';

$(function () {
    const form = $('#form');
    const input = $('#input');
    const ul = $('#ul');
    const todos = JSON.parse(localStorage.getItem('todos'));

    if (todos) {
        $.each(todos, function (index, todo) {
            add(todo);
        });
    }

    form.on('submit', function (event) {
        event.preventDefault();
        add();
    });

    function add(todo) {
        let todoText = input.val();

        if (todo) {
            todoText = todo.text;
        }

        if (todoText.length > 0) {

            const li = $('<li>').text(todoText)
                .addClass('list-group-item');

            if (todo && todo.completed) {
                li.addClass('text-decoration-line-through');
            }

            li.on('contextmenu', function (event) {
                event.preventDefault();
                $(this).remove();
                saveData();
            });

            li.on('click', function () {
                $(this).toggleClass('text-decoration-line-through');
                saveData();
            });

            ul.append(li);
            input.val('');
            saveData();
        }
    }

    function saveData() {
        const lists = $('li');
        let todos = [];

        lists.each(function () {
            let todo = {
                text: $(this).text(),
                completed: $(this).hasClass('text-decoration-line-through')
            };
            todos.push(todo);
        });

        localStorage.setItem('todos', JSON.stringify(todos));
    }
});

// 純粋なJavaScriptのコード
// 'use strict';

// const form = document.getElementById('form');
// const input = document.getElementById('input');
// const ul = document.getElementById('ul');
// const todos = JSON.parse(localStorage.getItem('todos'));

// if (todos) {
//     todos.forEach(todo => {
//         add(todo);
//     });
// }

// form.addEventListener('submit', function (event) {
//     event.preventDefault();
//     add();
// });

// function add(todo) {
//     let todoText = input.value;

//     if (todo) {
//         todoText = todo.text;
//     }

//     if (todoText.length > 0) {
//         const li = document.createElement('li');
//         li.innerText = todoText;
//         li.classList.add('list-group-item');

//         if (todo && todo.completed) {
//             li.classList.add('text-decoration-line-through');
//         }

//         li.addEventListener('contextmenu', function (event) {
//             event.preventDefault();
//             li.remove();
//             saveData();
//         });

//         li.addEventListener('click', function () {
//             li.classList.toggle('text-decoration-line-through');
//             saveData();
//         });

//         ul.appendChild(li);
//         input.value = '';
//         saveData();
//     }
// }

// function saveData() {
//     const lists = document.querySelectorAll('li');
//     let todos = [];

//     lists.forEach(list => {
//         let todo = {
//             text: list.innerText,
//             completed: list.classList.contains('text-decoration-line-through')
//         };
//         todos.push(todo);
//     });

//     localStorage.setItem('todos', JSON.stringify(todos));
// }
