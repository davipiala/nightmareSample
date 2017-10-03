const Nightmare = require('nightmare'); // import から requreに変更
const nightmare = Nightmare({ show: true });

function getSSLoop(){
    return nightmare
        .goto('http://10.0.2.2:8000')    //'http://www.nightmarejs.org/' //10.0.2.2 = vagrant host PC
        .wait(1000)
        .screenshot("./sample5ss.png")
        .then(getSSLoop)
        .catch((error) => {
            console.error('Search failed:', error);
        });
}

getSSLoop();