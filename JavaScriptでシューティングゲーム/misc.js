
//
//misc.js  その他、共通関数
//


//星クラス
class Star {
    constructor() {
        this.x = rand(0, FIELD_W) << 8;
        this.y = rand(0, FIELD_H) << 8;
        this.vx = 0;
        this.vy = rand(100, 300);
        this.sz = rand(1, 2);
    }

    draw() {
        let x = this.x >> 8;
        let y = this.y >> 8;

        if (x < camera_x || x >= camera_x + SCREEN_W
            || y < camera_y || y >= camera_y + SCREEN_H) return;

        vcon.fillStyle = rand(0, 2) != 0 ? "#66f" : "#aef";
        vcon.fillRect(x, y, this.sz, this.sz);

    }

    update() {
        this.x += this.vx * starSpeed / 100;
        this.y += this.vy * starSpeed / 100;
        if (this.y > FIELD_H << 8) {
            this.y = 0;
            this.x = rand(0, FIELD_W) << 8;
        }
    }

}


//キャラベース　クラス
class CharaBase {
    constructor(snum, x, y, vx, vy) {
        this.sn = snum;
        this.x = x;
        this.y = y;
        this.vx = vx;
        this.vy = vy;
        this.kill = false;
        this.count = 0;
    }

    update() {
        this.count++;

        this.x += this.vx;
        this.y += this.vy;

        if (this.x + (100 << 8) < 0 || this.x - (100 << 8) > FIELD_W << 8
            || this.y + (100 << 8) < 0 || this.y - (100 << 8) > FIELD_H << 8) this.kill = true;
    }

    draw() {
        drawSprite(this.sn, this.x, this.y);
    }
}

//アイテムのクラス
class Item extends CharaBase {
    constructor(x, y, vx, vy, type) {
        super(3, x, y, vx, vy); // ここでアイテムのスプライト番号を指定します（例: 3）
        this.type = type; // アイテムの種類（回復アイテムなど）を識別するためのフィールドを追加します
    }

    // アイテムを描画するメソッド
    draw() {
        drawSprite(this.sn, this.x, this.y);
    }
}



//爆発のクラス
class Expl extends CharaBase {
    constructor(c, x, y, vx, vy) {
        super(0, x, y, vx, vy);
        this.timer = c;
    }
    update() {
        if (this.timer) {
            this.timer--;
            return;
        }
        super.update();
    }
    draw() {
        if (this.timer) return;
        this.sn = 16 + (this.count >> 2);
        if (this.sn == 27) {
            this.kill = true;
            return;
        }
        super.draw();
    }
}

//もっと派手な爆発
function explosion(x, y, vx, vy) {
    expl.push(new Expl(0, x, y, vx, vy));
    for (let i = 0; i < 10; i++) {
        let evx = vx + (rand(-10, 10) << 6);
        let evy = vy + (rand(-10, 10) << 6);
        expl.push(new Expl(i, x, y, evx, evy));
    }
}

// BGMのON/OFFを切り替える関数
function toggleBGM() {
    if (bgmPlaying) {
        bgm.pause();//一般的にメディア（音楽やビデオ）の再生を一時停止するために使用されるメソッド
        bgmPlaying = false;
    } else {
        bgm.play();// メソッドは、通常はメディア（音楽やビデオ）の再生を開始するために使用されるメソッド
        bgmPlaying = true;
    }
}

class GameUtils {
    static endGame() {
        // スコアを取得する
        const currentScore = gscore;

        // プレイヤーの最高得点をローカルストレージから取得する
        const highestScore = localStorage.getItem('highestScore');

        // 最高得点がnullであるか、現在のスコアが最高得点よりも大きい場合
        if (highestScore === null || currentScore > parseInt(highestScore)) {
            // 最高得点を現在のスコアで更新する
            localStorage.setItem('highestScore', currentScore);

            // h-scoreフィールドに最高得点を表示する
            document.getElementById('h-score').value = currentScore;
        }

        // p-scoreフィールドに前回のスコアを表示する
        const previousScore = localStorage.getItem('previousScore');
        document.getElementById('p-score').value = previousScore || 'No previous score';

        // スコア表示
        const scoreDisplay = document.getElementById('score-display');
        scoreDisplay.textContent = 'Score: ' + currentScore;
    }

    static toggleBGM() {
        if (bgmPlaying) {
            bgm.pause();
            bgmPlaying = false;
        } else {
            bgm.play();
            bgmPlaying = true;
        }//インターフェースのメソッドの1つで、音声やビデオの再生を開始するために使用されます。このメソッドは、 <audio> や <video> タグなどで表されるメディア要素に対して呼び出される
    }

    static getScore() {
        return Math.floor(Math.random() * 1000);
    }
}

// ボタンのクリックイベントなどから呼び出す場合
// GameUtils.endGame();
// GameUtils.toggleBGM();
// GameUtils.getScore();



//キーボードが押された時
document.onkeydown = function (e) {
    key[e.keyCode] = true;
    if (gameOver && e.keyCode == 82) {
        playerDeathCount++;
        delete jiki;
        jiki = new Jiki();
        gameOver = false;
        score = 0;
    }
    if (e.keyCode == 82 || e.keyCode == 116) return true;
    if (e.keyCode == 83) {
        toggleBGM();
    }
    return false;
}

//キーボードが押されてない時
document.onkeyup = function (e) {
    key[e.keyCode] = false;
}

//指定された番号のスプライトを指定された位置に描画する
function drawSprite(snum, x, y) {
    let sx = sprite[snum].x;
    let sy = sprite[snum].y;
    let sw = sprite[snum].w;
    let sh = sprite[snum].h;

    let px = (x >> 8) - sw / 2;
    let py = (y >> 8) - sh / 2;

    if (px + sw < camera_x || px >= camera_x + SCREEN_W
        || py + sh < camera_y || py >= camera_y + SCREEN_H) return;

    vcon.drawImage(spriteImage, sx, sy, sw, sh, px, py, sw, sh);
}


//正数のランダムを作る
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//当たり判定
function checkHit(x1, y1, r1, x2, y2, r2) {
    // 円同士の当たり判定

    let a = (x2 - x1) >> 8;
    let b = (y2 - y1) >> 8;
    let r = r1 + r2;

    return r * r >= a * a + b * b;






    //矩形同士の当たり判定

    /*
    let left1   = x1>>8;
    let right1  = left1+w1;
    let top1    = y1>>8;
    let bottom1 = top1 +h1;
	
    let left2   = x2>>8;
    let right2  = left2+w2;
    let top2    = y2>>8;
    let bottom2 = top2 +h2;
	
    return (  left1 <= right2 &&
            right1 >= left2  &&
              top1 <= bottom2 &&
              bottom1 >= top2 );
    */

}