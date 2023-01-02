import mongoose from "mongoose"
import Apt from "../models/Apt"
import apartments from "./seed_apts/apartments.json"

export default async function seedApts(){

    const dbUrl = process.env.NEXT_MONGO_URL;

    console.log(dbUrl)
    mongoose.connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    
    const db = mongoose.connection;
    db.on("error", console.error.bind(console, "connection error"));
    db.once("open", () => {
        console.log("Database connected")
    })
    
    
    
    const seedDB = async function () {
        await Apt.deleteMany({});
        await Apt.insertMany(apartments);
    };
    
    seedDB().then(() => {
        db.close();
    })
}


export function printScreen() {
    console.log("hahahaahah")
}