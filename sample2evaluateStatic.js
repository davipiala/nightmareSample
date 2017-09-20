const Nightmare = require('nightmare'); // import から requreに変更
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio')

nightmare
    .goto('http://localhost:8000/staticsample.html')
    .wait('#webserver')  //追加
    .evaluate(() => {
        return document.getElementsByTagName('body')[0].innerHTML;
    })
    .end()
    .then((doc) => {
        const $ = cheerio.load(doc);
        console.log($("h1").text());
    })
    .catch((error) => {
        console.error('Search failed:', error);
    });