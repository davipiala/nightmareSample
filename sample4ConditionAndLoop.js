const Nightmare = require('nightmare'); // import から requreに変更
const cheerio = require('cheerio');
const vo = require('vo');

function gotoHighLow(nm){
    return nm
        .goto('http://localhost:8000/angularsample2.html')
        .wait('#expect');
}

function doExpect(nm, num){
    return nm
        .type('#expect')
        .type('#expect', num)
        .click('#doExpect')
        .evaluate(() => {
            return document.getElementsByTagName('body')[0].innerHTML;
        });
}

//メインロジック
//yield を使のでfunction*
function* searchNumber(nm){
    let min=1,max=100;  //予想範囲
    let hint='';
    let times='';
    while(hint!='correct!'){    ///正解するまでループ
        let expectedNum=Math.floor((min + max)/2);  //番号を予想（予想範囲の真ん中を使う）して
        let doc=yield doExpect(nm,expectedNum);     //お伺いを立てる
        const $ = cheerio.load(doc);                //結果をパース
        hint = $("#hint").text();
        times= $("#times").text();
        console.log(min + '<' + expectedNum + '<' + max + ':' + hint);
        if( hint=='low'){   //結果をもとに、番号予想範囲を狭める
            min=expectedNum;
        } else if(hint=='high'){
            max=expectedNum;
        }
    }
    return parseInt(times); //成功までに要した試行回数を返す。
    
}
//全体処理
vo(function* () {
    let nightmare = Nightmare({ show: true });
    yield gotoHighLow(nightmare);       //ゲームページに移動
    let times=yield searchNumber(nightmare);      // ゲームします
    yield nightmare.end();              //　終わります
    return times;
})(function (err, result) {
    if (err) return console.log(err);
    console.log(result + "Times");
});
