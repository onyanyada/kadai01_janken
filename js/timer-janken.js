// 合格点設定
$('#decide').click(function () {
    $("#passingScore").text($("#inputScore").val());
    $("#passingScore").addClass('scoretxt');
});


// タイマーここから
const time = document.querySelector("#time");
const sec = document.querySelector("#sec");
// const inputScore = document.querySelector("#inputScore");
let count = 0;

$('#start').click(function () {
    // ここでinputScoreを数値として取得
    const inputValue = $("#inputScore").val(); // 例えば、"45" という文字列が取得されるとします。
    const inputScore = parseInt(inputValue, 10); // "45" という文字列を 10 進数の整数 45 に変換します。
    // const inputScore = parseInt($("#inputScore").val(), 10); //一行にまとめた場合


    const set_id = setInterval(function () {
        count++;
        time.innerHTML = count;
        if (count == sec.value) {
            $(".jankenGame").hide();
            $('.timer').hide();
            $('.outer-result').show();
            $('.repeat').show();
            $(".passSet").hide();
            clearInterval(set_id);
            if (total > inputScore) {
                $(".comment").html('<p>合格点より上！</p><img src="./img/gokaku.png" width="300px">');
            } else if (total == inputScore) {
                $(".comment").html('<p>ぎり合格！</p><img src="./img/bimyo.png" width="300px">');
            } else {
                $(".comment").html('<p>不合格</p><img src="./img/hugokaku.png" width="300px">');
            }
        }

    }, 1000);

});
// タイマーここまで




// じゃんけんここから  
let total = 0;// 勝敗合計点数
let hand = "";//変数用意
let judge = ""; //変数用意
let score = 0; //変数用意：点数
let often = 0;//変数用意：回数
let average = 0; //変数用意：平均点
let win = 0;//勝った回数
let lose = 0;//負けた回数
let even = 0;//あいこ回数
let guWin = 0;//グーで勝った回数
let choWin = 0;//チョキで勝った回数
let paWin = 0;//パーで勝った回数
let guLose = 0;//グーで負けた回数
let choLose = 0;//チョキで負けた回数
let paLose = 0;//パーで負けた回数       
let winRate = 0;//勝率
let guWinRate = 0;//グーの勝率
let choWinRate = 0;//チョキの勝率
let paWinRate = 0;//パーの勝率

// グーを選んだ時
$("#gu_btn").on("click", function () {
    const r = Math.ceil(Math.random() * 3);//1.乱数(1~3)


    //2.if分岐処理

    if (r == 1) {
        hand = '<img src="./img/gu.png" width="100px">';
        judge = 'あいこ';
        score = 0;
        even += 1;

    }
    if (r == 2) {
        hand = '<img src="./img/choki.png" width="100px">';
        judge = '勝ち';
        score = 1;
        win += 1;
        guWin += 1;
        // 紙吹雪
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    if (r == 3) {
        hand = '<img src="./img/pa.png" width="100px">';
        judge = '負け';
        score = -1;
        lose += 1;
        guLose += 1;
    }

    // 計算
    jankenCalc();

    //3.表示処理
    jankenView();
});

// チョキを選んだ時
$("#cho_btn").on("click", function () {
    const r = Math.ceil(Math.random() * 3);//1.乱数(1~3)

    //2.if分岐処理
    if (r == 1) {
        hand = '<img src="./img/gu.png" width="100px">';
        judge = '負け';
        score = -1;
        lose += 1;
        choLose += 1;
    }
    if (r == 2) {
        hand = '<img src="./img/choki.png" width="100px">';
        judge = 'あいこ';
        score = 0;
        even += 1;
    }
    if (r == 3) {
        hand = '<img src="./img/pa.png" width="100px">';
        judge = '勝ち';
        score = 1;
        win += 1;
        choWin += 1;
        // 紙吹雪
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });

    }

    // 計算
    jankenCalc();
    //3.表示処理
    jankenView();
});

// パーを選んだ時
$("#par_btn").on("click", function () {
    const r = Math.ceil(Math.random() * 3);//1.乱数(1~3)
    //2.if分岐処理
    if (r == 1) {
        hand = '<img src="./img/gu.png" width="100px">';
        judge = '勝ち';
        score = 1;
        win += 1;
        paWin += 1;
        // 紙吹雪
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
    if (r == 2) {
        hand = '<img src="./img/choki.png" width="100px">';
        judge = '負け';
        score = -1;
        lose += 1;
        paLose += 1;
    }
    if (r == 3) {
        hand = '<img src="./img/pa.png" width="100px">';
        judge = 'あいこ';
        score = 0;
        even += 1;
    }

    // 計算
    jankenCalc();

    //3.表示処理
    jankenView();
});

//計算
const jankenCalc = () => {
    often++;
    total += score;
    average = Math.floor((total / often) * 10) / 10;
    winRate = Math.floor((win / (win + lose)) * 10) / 10;
    guWinRate = Math.floor((guWin / (guWin + guLose)) * 10) / 10;
    choWinRate = Math.floor((choWin / (choWin + choLose)) * 10) / 10;
    paWinRate = Math.floor((paWin / (paWin + paLose)) * 10) / 10;
}

//3.表示処理
const jankenView = () => {
    $("#pc_hands").html(hand);
    $("#judgment").html(judge);
    $("#score").html(score);
    $(".total").text(total);
    $(".often").html(often);
    $(".average").html(average);
    $(".win").html(win);
    $(".lose").html(lose);
    $(".even").html(even);
    $(".guWin").html(guWin);
    $(".choWin").html(choWin);
    $(".paWin").html(paWin);
    $(".winRate").html(winRate);
    $(".guWinRate").html(guWinRate);
    $(".choWinRate").html(choWinRate);
    $(".paWinRate").html(paWinRate);
    updateChart(score);



}
//じゃんけんここまで
// 折れ線チャートここから
// Google Charts ライブラリを読み込む
google.charts.load('current', { 'packages': ['corechart'] });
google.charts.setOnLoadCallback(initChart);

let chart;
let data;
let options;
let counts = 0; // 回数カウント用変数

// グラフの初期化
function initChart() {
    data = google.visualization.arrayToDataTable([
        ['Count', 'Score'],
        [0, 0]
    ]);

    options = {
        title: 'n回目のじゃんけんの点数',
        curveType: 'function',
        legend: { position: 'bottom' },
        hAxis: {
            title: 'n回目'
        },
        vAxis: {
            title: '点数'
        }
    };

    chart = new google.visualization.LineChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}

// グラフの更新
function updateChart(score) {
    counts++;
    data.addRow([counts, score]);
    chart.draw(data, options);
}
// 折れ線チャートここまで