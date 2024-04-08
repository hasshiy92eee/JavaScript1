const btn = document.getElementById("button");

btn.addEventListener("click", function () {
    console.log("調理開始");
});
const foods = ["人参", "ジャガイモ", "玉ねぎ"];

foods.forEach(function (food) {
    console.log("food");
});