import brain from 'brainjs'
import { normalize, denormalizePrice } from "./scaling.js"
import networkState from './network_state.json'

function getPriceForFlat(flat) {
    const net = new brain.NeuralNetwork();

    // const networkState = JSON.parse(fs.readFileSync(path.join(__dirname, "network_state.json"), "utf-8"));
    net.fromJSON(networkState);

    const trimmedFlat = {};
    trimmedFlat.sq_mt = flat.sq_mt;
    trimmedFlat.rooms = flat.rooms;
    trimmedFlat.long = flat.geometry.coordinates[0];
    trimmedFlat.lat = flat.geometry.coordinates[1];

    const scaledFlat = normalize(trimmedFlat);

    const result = denormalizePrice(net.run(scaledFlat));

    return result.price;
}

export default getPriceForFlat;