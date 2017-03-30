const request   = require(`request`);

let geocodeAddress = (userAddress, callback) => {
  let checkAddress = encodeURIComponent(userAddress);
  //requesting data from an api with request
  request({
      url: `https://maps.googleapis.com/maps/api/geocode/json?address=${checkAddress}`,
      json: true
    }, (error, response, body) => {
      if(error) {
      //server errors
      callback(`unable to connect to maps`);
    } else if (body.status === `ZERO_RESULTS`) {
      //machine errors
      callback(`unable to find that address`);
    } else if (body.status === `OK`) {
      callback(undefined, {
        address: body.results[0].formatted_address,
        latitude: body.results[0].geometry.location.lat,
        longitude: body.results[0].geometry.location.lng,
      });
    }
  });
}

module.exports.geocodeAddress = geocodeAddress
