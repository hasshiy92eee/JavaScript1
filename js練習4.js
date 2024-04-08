'use strict';
//条件分岐　if文

// let age = 16;

// if (age >= 20) {
//     console.log('adult');
// } else if (age == 0) {
//     console.log('baby');
// } else {
//     console.log('child');
// }




//論理演算子を使って条件式に、10歳以上20歳未満の場合は「10代」
//20歳以上30歳未満の場合は「20代」、30歳以上40歳未満の場合は「30代」
//これらの条件に合致しないものは「それ以外」と表示させる。



let AGE = 10;

if (AGE >= 10 && AGE <= 20) {
    console.log('10代');
} else if (AGE >= 20 && AGE <= 30) {
    console.log('20代');
} else if (AGE >= 30 && AGE <= 40) {
    console.log('30代');
} else {
    console.log('それ以外');
}
//未満を表示するには<のみで良い。。。
//上記は80点（惜しい）

//ループ処理　for文（繰り返し処理）
// for(スタート値;継続条件; 増減式) {
//例→for(let i = 0;i <= 4; i++){
//}

for (let i = 0; i <= 4; i++) {
    console.log(i);
}

//break文（一定の条件に当てはまった時に、繰り返し処理を終了）
for (var i = 0; i <= 20; i++) {
    if (i == 19) {
        break;
    }
    console.log(i);
}