//プログラミングとは
// 1.順次進行 A→B→Cと順番にソースコードを処理していくこと
// 2.条件分岐 yesの場合noの場合など２択、3択のこと
// 3.繰り返し 何度も同じ処理を繰り返す
'use strict';

console.log('Good morning');

console.log('Good afternoon');

console.log('Good evening');
//順次進行されていることがブラウザ検証で確認できる。

//変数を学ぶ！変数は文字や数字などのデータを保存できる。
// 変数が必要なときに取り出すことを「参照」という
// 変数にデータを入れることを「代入」という
// 変数には名前をつける事ができ変数名と言い、変数を作ることを
// 変数を宣言するという
let num;
num = 123;


let num01 = 456;
let num_1 = 78;
let num$1 = 9;
console.log(typeof (num));
console.log(typeof (num01));
console.log(typeof (num_1));
console.log(num$1);
//JavaScriptでは変数にデータを入れるときに、データ型を指定する
//必要がない。javaScriptが自動的にデータ型を判断する。
//JavaScriptは動的型付け言語
//Ruby,Python,PHPも動的型付け言語
//JavaScriptの数値型は、number型の1種類しかない。


//文字列型=string型ともいう
let string_a = 'Hello,World!';
console.log(string_a);
console.log(typeof (string_a));

//ブール型=Boolean型(ブーリアン)とも呼ばれる
//trueとFalseのどちらかの性質を持つ型
let a = 10;
let b = 1;
let bool01;

bool01 = (a > b);
console.log(bool01);
console.log(typeof (bool01));