const request   = require(`request`),
yargs                   = require(`yargs`),
geocode            = require(`./geocode/geocode`),
weather             = require(`./forecast/weather`)

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

console.log(argv);

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
  if(errorMessage) {
    console.log(errorMessage);
  } else {
    //print formatted address, latitude, longitude
        console.log(results.address);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, weatherResults) => {
          if(errorMessage) {
            console.log(errorMessage);
          } else {
            console.log(`it's currently ${weatherResults.temperature}. feels like ${weatherResults.apparentTemperature} though!`);
          }
        });
  }
});
