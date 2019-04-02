
const puppeteer = require('puppeteer');

const accountSid = 'AC751b816484c258227b97785b8a004d5a';
const authToken = '1c33d6b493ce2a91d6fef2db92002f0b';
const client = require('twilio')(accountSid, authToken);

async function searchMovie() {
  console.log('Run function')
  const url = 'https://www.cineplanet.com.pe/peliculas/avengers-end-game';
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  try {
    await page.waitForSelector('.film-detail-showtimes--title');
    console.log("Comprar pelicula")
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
    await page.screenshot({path: 'page.png', fullPage:true});
  } catch(e) {
    console.log("Pelicula no esta disponible")
    console.log("error detail ",e)

  }
  await browser.close();
}
searchMovie()
setInterval(searchMovie, 180000);
