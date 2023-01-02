import maxMins from './maxMins.json'

const {max_sq_mt, min_sq_mt, max_rooms, min_rooms, max_long, min_long, max_lat, min_lat, max_price, min_price} = maxMins;

const normalize = function (step) {
    return {
        sq_mt: (step.sq_mt - min_sq_mt) / (max_sq_mt - min_sq_mt),
        rooms: (step.rooms - min_rooms) / (max_rooms - min_rooms),
        long: (step.long - min_long) / (max_long - min_long),
        lat: (step.lat - min_lat) / (max_lat - min_lat)
    };
};
const denormalize = function (step) {
    return {
        sq_mt: (step.sq_mt * (max_sq_mt - min_sq_mt)) + min_sq_mt,
        rooms: (step.rooms * (max_rooms - min_rooms)) + min_rooms,
        long: (step.long * (max_long - min_long)) + min_long,
        lat: (step.lat * (max_lat - min_lat)) + min_lat
    };
};
const normalizePrice = function (step) {
    return { price: (step.price - min_price) / (max_price - min_price) };
};
const denormalizePrice = function (step) {
    return { price: (step.price * (max_price - min_price)) + min_price };
};


export { normalize };
export { denormalize };
export { normalizePrice };
export { denormalizePrice };
