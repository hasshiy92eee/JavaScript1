//デバッグのフラグ
const DEBUG = false;

let drawCount = 0;
let fps = 0;
let lastTime = Date.now();

//スムージング
const SMOOTHING = false;

//ゲームスピード(ms)
const GAME_SPEED = 1000 / 60;

//画面サイズ
const SCREEN_W = 320;
const SCREEN_H = 320;

//キャンバスサイズ
const CANVAS_W = 598;
const CANVAS_H = SCREEN_H * (598 / 320);

//フィールドサイズ
const FIELD_W = SCREEN_W + 120;
const FIELD_H = SCREEN_H + 40;

//星の数
const STAR_MAX = 300;

//キャンバス　
let can = document.getElementById("can");
let con = can.getContext("2d");
can.width = CANVAS_W;
can.height = CANVAS_H;
con.mozimageSmoothingEnagbled = SMOOTHING;
con.webkitimageSmoothingEnabled = SMOOTHING;
con.msimageSmoothingEnabled = SMOOTHING;
con.imageSmoothingEnabled = SMOOTHING;
con.font = "14px 'Impact'";

//フィールド（仮想画面）
let vcan = document.createElement("canvas");
let vcon = vcan.getContext("2d");
vcan.width = FIELD_W;
vcan.height = FIELD_H;
vcon.font = "12px 'Impact'";

//カメラの座標
let camera_x = 0;
let camera_y = 0;

//ゲームオーバー設定
let gameOver = false;
let score = 0;
let playerDeathCount = 0;

//ボスのHPが0の時
let bossHP = 0;
let bossMHP = 0;

//星の実体
let star = [];

//キーボードの状態
let key = [];

//オブジェクト達
let teki = [];
let teta = [];
let tama = [];
let expl = [];
let jiki = new Jiki();
//teki[0]= new Teki( 75, 200<<8,200<<8, 0,0);

//ファイルの読み込み
let spriteImage = new Image();
let bgImg = new Image();

spriteImage.src = "image/sprite.png";
bgImg.src = "image/bc2.png";


// 背景画像の読み込みが完了したら背景を描画する
bgImg.onload = function () {
    vcon.drawImage(bgImg, 0, 0, FIELD_W, FIELD_H);
};
//JavaScriptで画像や外部リソースの読み込みが完了したときに呼び出されるイベントハンドラ
//drawImage=Canvas要素上に画像を描画するためのメソッド


//BGMを追加
let bgm = document.getElementById("bgm");//idのbgmを取得
let bgmPlaying = false;


//ゲーム初期化
function gameInit() {
    for (let i = 0; i < STAR_MAX; i++)star[i] = new Star();
    setInterval(gameLoop, GAME_SPEED);

    jiki.killCount = 0;
    gameOver = false;
    // Fをきっちり合わせた時は＞ requestAnimationFrameを使いましょう
}

//オブジェクトをアップデート
function updateObj(obj) {
    for (let i = obj.length - 1; i >= 0; i--) {
        obj[i].update();
        if (obj[i].kill) obj.splice(i, 1);
    }
}

//オブジェクトを描画
function drawObj(obj) {
    for (let i = 0; i < obj.length; i++)obj[i].draw();
}


//移動処理
function updateAll() {
    updateObj(star);
    updateObj(tama);
    updateObj(teta);
    updateObj(teki);
    updateObj(expl);
    if (!gameOver) jiki.update();
}

// 自機のHPに応じて適切なスプライトを返す
function getPlayerSprite(playerHP) {
    if (playerHP <= 20) {
        return sprite[0]; // 自機1
    } else if (playerHP <= 40) {
        return sprite[1]; // 自機2
    } else {
        return sprite[2]; // 自機3
    }
}

// 描画処理
function drawAll() {
    // 描画の処理
    if (jiki.damage) {
        vcon.fillStyle = "red";
    } else {
        vcon.fillStyle = "black";
    }

    // 黒い背景を描画
    vcon.fillRect(camera_x, camera_y, SCREEN_W, SCREEN_H);

    // 背景画像を描画（優先度を上げて表示）
    vcon.drawImage(bgImg, 0, 0, FIELD_W, FIELD_H);

    drawObj(star);
    drawObj(tama);
    if (!gameOver) jiki.draw();

    const playerSprite = getPlayerSprite(jiki.hp);

    drawObj(teki);
    drawObj(expl);
    drawObj(teta);

    // 自機の範囲0　〜 FIELD_W
    //カメラの範囲 0 〜 (FIELD_W-SCREEN_W)

    camera_x = Math.floor((jiki.x >> 8) / FIELD_W * (FIELD_W - SCREEN_W));
    camera_y = Math.floor((jiki.y >> 8) / FIELD_H * (FIELD_H - SCREEN_H));


    //ボスのHPを表示する

    if (bossHP > 0) {
        let sz = (SCREEN_W - 20) * bossHP / bossMHP;
        let sz2 = (SCREEN_W - 20);

        vcon.fillStyle = "rgba(255,0,0,0.5)";
        vcon.fillRect(camera_x + 10, camera_y + 10, sz, 10);
        vcon.strokeStyle = "rgba(255,0,0,0.9)";
        vcon.strokeRect(camera_x + 10, camera_y + 10, sz2, 10);
    }

    // 自機のHPを表示をアレンジ
    if (jiki.hp > 0) {
        let maxHP = jiki.mhp;
        let currentHP = jiki.hp;
        let memoryWidth = 100;
        let memoryHeight = 10;
        let memoryX = camera_x + 10;
        let memoryY = camera_y + SCREEN_H - 20;

        //メモリの背景を描画
        let sz = (SCREEN_W - 20) * jiki.hp / jiki.mhp;
        let sz2 = (SCREEN_W - 20);


        // HPバーの描画
        vcon.fillStyle = "rgba(0,255,0,0.7)";
        vcon.fillRect(camera_x + 10, camera_y + SCREEN_H - 14, sz, 10);
        vcon.strokeStyle = "rgba(0,255,0,0.9)";
        vcon.strokeRect(camera_x + 10, camera_y + SCREEN_H - 14, sz2, 10);
    }

    // スコア表示
    vcon.fillStyle = "white";
    vcon.fillText("SCORE " + score, camera_x + 10, camera_y + 14);
    //filltext Canvasキャンバス要素上にテキストを描画するためのもの
    //cameraから右に10,14


    //自機のHP表示
    vcon.fillStyle = "white";
    vcon.fillText("HP: " + jiki.hp, camera_x + 10, camera_y + 34);

    //自機の死亡回数表示
    vcon.fillStyle = "white";
    vcon.fillText("DEATH:" + playerDeathCount, camera_x + 10, camera_y + 54);


    // 仮想画面から実際のキャンバスにコピー
    con.drawImage(vcan, camera_x, camera_y, SCREEN_W, SCREEN_H, 0, 0, CANVAS_W, CANVAS_H);
}

//情報の表示
function putInfo() {
    con.fillStyle = "red";
    con.font = "28px 'Impact'";

    if (gameOver) {
        let s = "GAME OVER";
        let w = con.measureText(s).width;
        let x = CANVAS_W / 2 - w / 2;
        let y = CANVAS_H / 2 - 20;
        con.fillText(s, x, y);
        let margin = 20;
        s = "星々を支配せよ。'R'キーで侵略開始だ!";
        w = con.measureText(s).width;
        x = CANVAS_W / 2 - w / 2;
        y = CANVAS_H / 2 - 20 + 20;
        con.fillText(s, x, y + margin * 2);
    }

    if (DEBUG) {
        drawCount++;
        if (lastTime + 1000 <= Date.now()) {
            fps = drawCount;
            drawCount = 0;
            lastTime = Date.now();
        }


        con.fillText("FPS :" + fps, 20, 20);
        con.fillText("Tama:" + tama.length, 20, 40);
        con.fillText("Teki:" + teki.length, 20, 60);
        con.fillText("Teta:" + teta.length, 20, 80);
        con.fillText("Expl:" + expl.length, 20, 100);
        con.fillText("X:" + (jiki.x >> 8), 20, 120);
        con.fillText("Y:" + (jiki.y >> 8), 20, 140);
        con.fillText("HP:" + jiki.hp, 20, 160);
        con.fillText("SCORE:" + score, 20, 180);
        con.fillText("COUNT:" + gameCount, 20, 200);
        con.fillText("WAVE:" + gameWave, 20, 220);
    }
}

let gameCount = 0;
let gameWave = 0;
let gameRound = 0;

let starSpeed = 100;
let starSpeedReq = 100;

//ゲームループ
function gameLoop() {

    gameCount++;
    if (starSpeedReq > starSpeed) starSpeed++;
    if (starSpeedReq < starSpeed) starSpeed--;

    if (gameWave == 0) {
        if (rand(0, 15) == 1) {
            teki.push(new Teki(0, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
        }
        if (gameCount > 60 * 20) {
            gameWave++;
            gameCount = 0;
            starSpeedReq = 200;
        }
    }
    else if (gameWave == 1) {
        if (rand(0, 15) == 1) {
            teki.push(new Teki(1, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
        }
        if (gameCount > 60 * 20) {
            gameWave++;
            gameCount = 0;
            starSpeedReq = 100;
        }
    }
    else if (gameWave == 2) {
        if (rand(0, 10) == 1) {
            let r = rand(0, 1);
            teki.push(new Teki(r, rand(0, FIELD_W) << 8, 0, 0, rand(300, 1200)));
        }
        if (gameCount > 60 * 20) {
            gameWave++;
            gameCount = 0;
            teki.push(new Teki(2, (FIELD_W / 2) << 8, -(70 << 8), 0, 200));
            starSpeedReq = 600;
        }
    }
    else if (gameWave == 3) {

        if (teki.length == 0) {
            gameWave = 0;
            gameCount = 0;
            gameRound++;
            starSpeedReq = 100;
        }
    }

    updateAll();
    drawAll();
    putInfo();
}

// Game-Startボタンが押されたらゲームを開始する関数
function startGame() {
    setTimeout(gameInit, 1000);//1000ミリ秒=1秒
}
//指定された時間（ミリ秒単位）が経過した後に、指定された関数を一度だけ実行するために使用されます。
//ゲーム呼び出し時に初期化する

// Game-Startボタンの要素を取得
const gameStartButton = document.querySelector('.Game-Start');//CSSクラスが "Game-Start" に設定された要素を取得しています

// Game-Startボタンにクリックイベントリスナーを追加
gameStartButton.addEventListener('click', startGame);//特定のイベントが特定の要素に対して発生したときに、指定した関数（イベントリスナー）を呼び出すために使用する



//teki.push( new Teki(2,(FIELD_W/2)<<8 ,0, 0,200 ) );