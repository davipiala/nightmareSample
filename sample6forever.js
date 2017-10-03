const Nightmare = require('nightmare'); // import から requreに変更
const nightmare = Nightmare({ show: false });

nightmare
    .goto('http://localhost:8000')    //'http://www.nightmarejs.org/' //10.0.2.2 = vagrant host PC
    .wait(1000)
    .screenshot("./sample6forever.png")
    .end()
    .then(()=>{
        console.log("Done.");
    })
    .catch((error) => {
        console.error('Search failed:', error);
    });

