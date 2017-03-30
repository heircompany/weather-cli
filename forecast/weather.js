const request   = require(`request`);
const key = `e37d420e479b46b31b6416b7bb97a31a`;

let getWeather = (lat, lng, callback) => {

request({
      url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
      json: true
    }, (error, response, body) => {
      if(!error && response.statusCode === 200) {
          callback(undefined, {
            temperature: body.currently.temperature,
            apparentTemperature: body.currently.apparentTemperature
        });
      } else {
          callback(`unable to fetch weather`);
      };
    }
  );
};

module.exports.getWeather = getWeather
