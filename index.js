
const puppeteer = require('puppeteer');

const accountSid = 'AC751b816484c258227b97785b8a004d5a';
const authToken = '1c33d6b493ce2a91d6fef2db92002f0b';
const client = require('twilio')(accountSid, authToken);

(async () => {
  const url = 'https://www.cineplanet.com.pe/peliculas/avengers-end-game';
  const text = 'No hay funciones programadas para esta película';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  try {
    await page.waitForFunction(
      text => document.querySelector('body').innerText.includes(text),
      {},
      text
    );
  } catch(e) {
    console.log(`The text "${text}" was not found on the page`);
    client.messages.create(
        {
          to: '+51962281080',
          from: '+12029198763', 
          body: 'avengers end game disponible para la compra :D https://www.cineplanet.com.pe/peliculas/avengers-end-game ',
        },
        (err, message) => {
            console.log(err)
          console.log(message.sid);
        }
      );
  }

  await page.screenshot({path: 'page.png', fullPage:true});
  await browser.close();

})();
