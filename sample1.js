const Nightmare = require('nightmare'); // import から requreに変更
const nightmare = Nightmare({ show: true });

nightmare
  .goto('https://duckduckgo.com')
  .wait('#search_form_input_homepage')  //追加
  .type('#search_form_input_homepage', 'github nightmare')
  .click('#search_button_homepage')
  .wait('#r1-0 a.result__a')
  .evaluate(() => document.querySelector('#r1-0 a.result__a').href)
  .end()
  .then(console.log)
  .catch((error) => {
    console.error('Search failed:', error);
  });