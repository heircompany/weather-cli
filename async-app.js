const request   = require(`request`),
yargs                   = require(`yargs`),
axios                    = require(`axios`);

const key = `e37d420e479b46b31b6416b7bb97a31a`;
const argv = yargs
    .options({
        a: {
          demand: true,
          alias: `address`,
          describe: `check weather for this address`,
          string: true
        }
    })
    .help()
    .alias(`help`, `h`)
    .argv;

let checkAddress = encodeURIComponent(argv.address);
let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${checkAddress}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === `ZERO_RESULTS`) {
    throw new Error(`unable to find that address`);
}

  let lat = response.data.results[0].geometry.location.lat;
  let lng = response.data.results[0].geometry.location.lng;
    let weatherUrl = `https://api.darksky.net/forecast/${key}/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address);
    return axios.get(weatherUrl);
})
.then((response) => {
    let temperature = response.data.currently.temperature;
    let apparentTemperature = response.data.currently.apparentTemperature;
      console.log(`it's currently ${temperature}. feels like ${apparentTemperature} though!`);
})
.catch((e) => {
  if (e.code === `ENOTFOUND`) {
    console.log(`unable to connect to api servers`);
  } else {
    console.log(e.message)
  }
});

// more ideas
// more info - from weather app
// add default location command - run without an argument
// fuck andrew mead
