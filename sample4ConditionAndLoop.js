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

vo(function* () {
    let nightmare = Nightmare({ show: true });
    yield gotoHighLow(nightmare);
    let min=1,max=100;
    let hint='';
    let times='';
    while(hint!='correct!'){
        let expectedNum=Math.floor((min + max)/2);
        let doc=yield doExpect(nightmare,expectedNum);
        const $ = cheerio.load(doc);
        hint = $("#hint").text();
        times= $("#times").text();
        console.log(min + '<' + expectedNum + '<' + max + ':' + hint);
        if( hint=='low'){
            min=expectedNum;
        } else if(hint=='high'){
            max=expectedNum;
        }
    }


    yield nightmare.end();
    return times;
})(function (err, result) {
    if (err) return console.log(err);
    console.log(result + "Times");
});
