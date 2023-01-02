const { apts, prices } = require("./cleaning_data")
const fs = require('fs');

const normalize = function (step) {
    return {
        sq_mt: (step.sq_mt - Math.min(...sq_mt)) / (Math.max(...sq_mt) - Math.min(...sq_mt)),
        rooms: (step.rooms - Math.min(...rooms)) / (Math.max(...rooms) - Math.min(...rooms)),
        long: (step.long - Math.min(...long)) / (Math.max(...long) - Math.min(...long)),
        lat: (step.lat - Math.min(...lat)) / (Math.max(...lat) - Math.min(...lat))
    };
};
const denormalize = function (step) {
    return {
        sq_mt: (step.sq_mt * (Math.max(...sq_mt) - Math.min(...sq_mt))) + Math.min(...sq_mt),
        rooms: (step.rooms * (Math.max(...rooms) - Math.min(...rooms))) + Math.min(...rooms),
        long: (step.long * (Math.max(...long) - Math.min(...long))) + Math.min(...long),
        lat: (step.lat * (Math.max(...lat) - Math.min(...lat))) + Math.min(...lat)
    };
};
const normalizePrice = function (step) {
    return { price: (step.price - Math.min(...price)) / (Math.max(...price) - Math.min(...price)) };
};
const denormalizePrice = function (step) {
    return { price: (step.price * (Math.max(...price) - Math.min(...price))) + Math.min(...price) };
};

const sq_mt = apts.map((obj) => { return obj.sq_mt });
const rooms = apts.map((obj) => { return obj.rooms });
const long = apts.map((obj) => { return obj.long });
const lat = apts.map((obj) => { return obj.lat });
const price = prices.map((obj) => { return obj.price });

const maxMins = {
    max_sq_mt: Math.max(...sq_mt),
    min_sq_mt: Math.min(...sq_mt),
    max_rooms: Math.max(...rooms),
    min_rooms: Math.min(...rooms),
    max_long: Math.max(...long),
    min_long: Math.min(...long),
    max_lat: Math.max(...lat),
    min_lat: Math.min(...lat),
    max_price: Math.max(...price),
    min_price: Math.min(...price)
}

var jsonContent = JSON.stringify(maxMins);

fs.writeFile("../maxMins.json", jsonContent, 'utf8', function (err) {
    if (err) {
        console.log("An error occured while writing JSON Object to File.");
        return console.log(err);
    }
 
    console.log("JSON file has been saved.");
});

const scaledApts = apts.map(normalize);

const scaledPrices = prices.map(normalizePrice);

module.exports.scaledApts = scaledApts;
module.exports.scaledPrices = scaledPrices;


const trainingData = [];
for (let i = 0; i < apts.length; i++) {
    trainingData.push({
        input: scaledApts[i],
        output: scaledPrices[i]
    });
};

module.exports.normalize = normalize;
module.exports.denormalize = denormalize;
module.exports.normalizePrice = normalizePrice;
module.exports.denormalizePrice = denormalizePrice;

module.exports.trainingData = trainingData;