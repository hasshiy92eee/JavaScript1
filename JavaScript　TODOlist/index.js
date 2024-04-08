'use strict';
//documentもグローバルオブジェクト
const from = document.getElementById('form');
const input = document.getElementById('input');
const ul = document.getElementById('ul');

const todos = JSON.parse(localStorage.getItem('todos'));

if (todos) {
    todos.forEach(todo => {
        add(todo);
    });
};

//addEventListenerは特定のイベントが発生した時に実行され
//コールバック関数を設定できる

from.addEventListener('submit', function (event) {

    //preventDefaultは通常、ブラウザを再読み込みすると記録をリセット
    //しようとするが、その記録をリセットをさせないメソッド
    //テキストで文字を入力したら、すぐ消えてしまうが、
    //入力した文字を消されたくない時に使用
    event.preventDefault();
    console.log();
    //consoleはグローバルオブジェクト

    add();
});

function add(todo) {

    //JavaScriptで新しいHTML要素を作成するためのメソッドです。
    //これを使うことで、動的に新しい要素をHTML文書に追加することができます。

    const li = document.createElement('li');
    let todoText = input.value;
    if (todo) {
        todoText = todo.text;
    }

    if (todoText.length > 0) { //.length > 0が無くてもプログラムは動く

        li.innerText = todoText;
        li.classList.add('list-group-item');
        if (todo && todo.completed) {
            li.classList.add('text-decoration-line-through')
        };

        li.addEventListener('contextmenu', function (event) {
            event.preventDefault();
            li.remove();//removeメソッドは、DOM（Document Object Model）から要素を削除するためのメソッドです。このメソッドを使用すると、特定の要素を簡単に削除することができます。
            saveDate();
        });
        li.addEventListener('click', function (event) {
            li.classList.toggle('text-decoration-line-through');
            saveDate();
        });
        //toggle は、JavaScriptで要素の表示と非表示を切り替えるためのメソッドです

        ul.appendChild(li);
        input.value = "";// 入力フィールドを空にする
        saveDate();
    }
}
function saveDate() {
    const lists = document.querySelectorAll('li');
    let todos = [];
    
    lists.forEach(list => {
        let todo = {
            text: list.innerText,
            completed: list.classList.contains
            ('text-decoration-line-through')
        };
        todos.push(todo);//pushは配列の末尾に新しい要素を追加するためのメソッド
    });
    localStorage.setItem('todos', JSON.stringify(todos));
}
//createElementは要素のクラスを操作するためのプロパティです。このプロパティを使用すると
//要素にクラスを追加、削除、トグル、存在を確認することができます。

//appendChild()は、指定された要素を別の要素の子要素として追加するJavaScriptのメソッドです。
//具体的には、指定された要素が別の要素の最後の子要素として追加されます。

//value は、HTMLフォーム要素（input、select、textareaなど）
//の現在の値を取得または設定するためのプロパティです。
//このプロパティは、フォームの要素に入力されたテキスト、選択されたオプション
//または入力されたテキストエリアの内容などを表します。

//querySelectorAll は、JavaScriptで使用されるメソッドの1つで
//ドキュメント内の要素を特定のCSSセレクタに基づいて検索し
//マッチするすべての要素を取得します。