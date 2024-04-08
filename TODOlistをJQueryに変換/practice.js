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

            const li = $('<li>').text(todoText);
            li.addClass('list-group-item');

            if (todo && todo.completed) {
                li.addClass('text-decoration-line-through');
            }

            li.on('contextmenu', function (event) {
                event.preventDefault();
                $(this).remove();
                saveData();
            });

            li.on('click', function () {
                $(this).toggleClass('text-decoration-line-through')
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