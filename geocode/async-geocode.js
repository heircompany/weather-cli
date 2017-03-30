const request   = require(`request`);

let geocodeAddress = (address)  => {
  return new Promise((resolve, reject) => {
    let checkAddress = encodeURIComponent(address);
    //requesting data from an api with request
    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${checkAddress}`,
        json: true
      }, (error, response, body) => {
        if(error) {
        //server errors
        reject(`unable to connect to maps`);
      } else if (body.status === `ZERO_RESULTS`) {
        //machine errors
        reject(`unable to find that address`);
      } else if (body.status === `OK`) {
        resolve({
          address: body.results[0].formatted_address,
          latitude: body.results[0].geometry.location.lat,
          longitude: body.results[0].geometry.location.lng,
        });
      }
    });
  });
};

geocodeAddress(`promote local`)
.then((location) => {
  console.log(JSON.stringify(location, undefined, 2))
}, (errorMessage) => {
  console.log(errorMessage);
});
