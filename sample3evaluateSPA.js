const Nightmare = require('nightmare'); // import から requreに変更
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio')

nightmare
    .goto('http://localhost:8000/angularsample.html')
    .wait('#input')  //追加
    .type('#input', 'ore-ore')
    .evaluate(() => {
        return document.getElementsByTagName('body')[0].innerHTML;
    })
    .end()
    .then((doc) => {
        const $ = cheerio.load(doc);
        console.log($("#output").text());
    })
    .catch((error) => {
        console.error('Search failed:', error);
    });