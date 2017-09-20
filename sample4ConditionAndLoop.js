const Nightmare = require('nightmare'); // import から requreに変更
const nightmare = Nightmare({ show: true });
const cheerio = require('cheerio')

nightmare
    .goto('http://localhost:8000/angularsample2.html')
    .wait('#expect')  //追加
    .type('#expect', '10')
    .click('#doExpect')
    .evaluate(() => {
        return document.getElementsByTagName('body')[0].innerHTML;
    })
    .end()
    .then((doc) => {
        const $ = cheerio.load(doc);
        console.log($("#hint").text());
    })
    .catch((error) => {
        console.error('Search failed:', error);
    });