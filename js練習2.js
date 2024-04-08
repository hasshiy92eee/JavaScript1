//配列とは？変数は１つしかデータを入れられないのに対して
//複数のデータを入れる事ができる「ロッカー」のようなもの
//1列の配列の事を1次元配列と呼び
//２列以上ある配列を多次元配列と呼ぶ。
//配列の１つ１つの箱を要素といい、箱の数を要素数と言う。
//配列それぞれの要素には、場所の情報が割り当てられていて
//データが住んでいる住所（インデックス番号）番号が割り当てられてる
//インデックス番号は０から始まる
'use strict';


//配列の作り方①
let num = new Array(3);

num[0] = 'sato';
num[1] = 'sio';
num[2] = 'syoyu';

console.log(num[0]);
console.log(num[1]);
console.log(num[2]);

//配列の作り方②変更方法
let arr = ['砂糖', '塩', '醤油'];

arr[1] = '味醂';

console.log(arr[0]);
console.log(arr[1]);
console.log(arr[2]);

//2次元配列を作ってみよう
let add; // 変数の宣言
add = [['sato', 'sio'], ['syoyu', 'mirin']]; // 2次元配列の作成
console.log(add[0][0]); // 'sato'
console.log(add[0][1]); // 'sio'
console.log(add[1][0]); // 'syoyu'
console.log(add[1][1]); // 'mirin'

