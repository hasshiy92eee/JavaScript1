<?php
// データベース接続情報
$servername = "localhost";
$username = "your_username";
$password = "your_password";
$dbname = "your_database";

// データベース接続の設定回り
$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT player_name, highest_score, previous_score FROM rankings ORDER BY highest_score DESC LIMIT 30";
$result = $conn->query($sql);

?>

<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description"
        content="(JavaScriptの作品です)挑戦者よ、星々の戦場で真のシューターになるチャンスだ！リアルタイムのランキングで友達や世界中のプレイヤーと競い合い、栄光を手に入れよう。">
    <title>星襲戦記物語</title>
    <link rel="icon" href="image/favi.png">
    <link rel="stylesheet" href="css/sanitize.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="misc.js" defer></script>
    <script src="data.js" defer></script>
    <script src="jiki.js" defer></script>
    <script src="teki.js" defer></script>
    <script src="shooting_game.js" defer></script>
</head>

<body>
    <audio id="bgm" loop autoplay>
        <source src="bgm/bgm4.mp3" type="audio/mpeg">
    </audio>

    <div class="main-body">
        <div id="content">
            <canvas id="can"></canvas>
            <input type="button" value="ゲームスタート" class="Game-Start">

            <header class="page-header">
                <nav>
                    <ul class="main-nav">
                        <li><a href="home.html">ホームに戻る</a></li>
                        <li><a href="story_mode.html">ストーリーモード</a></li>
                        <li><a href="score_mode.html">スコアアタックモード</a></li>
                    </ul>
                </nav>
            </header>

            <article class="ps-article">
                <h1>星襲戦記物語</h1>
                <h2>☆シューティングゲーム操作方法☆</h2>
                <ul class="ps-ul">
                    <li><strong>ゲームスタートボタンをクリックで1秒後に開始。</strong></li>
                    <li>spaceキーで自機の弾発射です。</li>
                    <li>矢印キーで移動します。「 ← ↑ ↓ → 」</li>
                    <li>ゲームオーバー時はRキーで再スタートです。</li>
                    <li>ゲームプレイ中は(Windows)ctrl+R <br>
                        (mac)command+Rでリセットです。</li>
                    <li>sキーでbgmのON/OFF</li>
                    <li>ゲーム終了はブラウザーの×です。</li>
                    <li>PCの性能によりゲームに <br>
                        遅延が発生することをご了承ください。</li>
                    <li>※ゲームスタートボタンを連続でクリックするとゲームが高速化するので注意</li>
                </ul>
            </article>
        </div>


        <div class="div-ranking">
            <h3>╗|║.:*・° ランキング °・*:. ║|╔</h3>
            <input type="button" onclick="location.href='./high-score.html'" value="上位30位ランキング" class="div-ranking-a">
            <p id="ranking-p">
                ※スコアアタックモードのランキング記録は、1週間保持されます（毎週日曜日の20時に更新されます）
            </p>
        </div>

        <footer class="footer-information">
            <form action="" class="form">
                <table class="form-table">
                    <tr>
                        <td>player name <br>(12文字以内)</td>
                        <td>Highest Score <br>(最高記録)</td>
                        <td>Previous Score <br>(前回の記録)</td>
                    </tr>

                    <?php
        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                echo "<tr><td>" . htmlspecialchars($row["player_name"]) . "</td><td>" . $row["highest_score"] . "</td><td>" . $row["previous_score"] . "</td></tr>";
            }
        } else {
            echo "<tr><td colspan='3'>ランキング情報</td></tr>";
        }
        ?>
    </table>
</body>

</html>

<?php

$conn->close();
?>


