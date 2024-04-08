// 算術演算子を学ぶ
'use strict';

var x = 10;
var y = 2;

console.log(x + y);//10+2=12
console.log(x - y);//10-2=8
console.log(x * y);//10*2=20
console.log(x / y);//10/2=5
console.log(x % y);//10%2=0

//関係演算子
//関係演算子とは２つの値の関係が正しいか正しくないか判断させる演算子

var c = 10;
var d = 2;
var e = 10;

console.log(c < d);
console.log(c > d);

console.log('以上以下');
//以上、以下の場合は>=, <=を使用する
//d以上
console.log(c >= d);
//c以下
console.log(c <= d);


//等価の場合
// ==
// !=
console.log('等価なら== 等価でないなら!=');
console.log(c == d);
console.log(c == e);
console.log(c != d);

//論理演算子
//and(かつ) = &&
//or(または) = ||(バーティカルバー)

let f = 8;
let g = 3;
//5以上　かつ　10以下
console.log(f >= 5 && f <= 10);
console.log(g >= 5 && y <= 10);

let score1 = 70
let score2 = 60

console.log(score1 == 70 || score2 == 70);
console.log(score1 == 10 || score2 == 10);

//代入演算子
//今まで変数に代入するときに使っていた=代入演算子という
//足し算、引き算など、組み合わせて代入する演算子

var x = 8;
var y = 12;
var z = 20;
x += 10;
z += y;

console.log(x);
console.log(z);

//インクリメント、デクリメント（論理演算子）
//インクリメントは値を1増やす演算子→変数名++
//デクリメントは値を1減らす演算子→変数名--

let i = 8;
let j = 8;

i++;
j--;

console.log(i);
console.log(j);