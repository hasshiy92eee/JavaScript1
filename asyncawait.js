//JSコーディングしていると、データを取得し終わるまで画面が表示されない
//という問題に直面した！
//なぜかというと通常プログラムとは上から順番に処理をしていくので遅くなる！
//なので人類は考えた！バックグラウンドでデータ処理を行おう！
//データはバックグラウンドで行い画面だけ先に表示しておこうということ
//画面表示だけ先にして、データ取得をバックグラウンドで行うことを非同期処理と
//名付けた。つまりタイミングをずらせば良いと。。。
//非同期処理を実現するためにコールバック関数を開発した。。。
//setTime(() => console.log(1), 1000);
//console.log(2)
//上記のように引数に関数を取ることをコールバック関数と言いう
//こうしてコールバック関数によりタイミングをずらすことに成功はしたが。。。
//ものすごくコードが長くなったり、見辛くなるというコールバック地獄が発生した
//ここで人類はpromiseを発明した。連続したコールバック関数をフラットに
//書けるようにする。（後で値を返すから待ってね）という約束すプログラムを作成
//ネスト（入れ子構造）は無くなったが、thenで繋げすぎて、見づらいコードに。
//ここでついに完成形のasync/awaitを開発した。（下のコードが完成形）

async function callApi() {
    const res = await fetch("https://jsonplaceholder.typicode.com/users");
    const users = await res.json();
    console.log(users);
}

callApi();

// -----async/awaitの１秒まつ関数の例ーーーー
const tset = async () => {
    console.log(1);
    await new Promise((resolve) => {
        setTimeout(() => {
            console.log(2);
            resolve();
        }, 1000)
    })
}

const main = async () => {
    await tset();
    console.log(3);
}
main()

//async awaitはインターネットブラウザのみ非対応
//ただしbabelを使うと使用可能



