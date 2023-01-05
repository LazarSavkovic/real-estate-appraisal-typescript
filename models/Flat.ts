import mongoose from 'mongoose'


const flatSchema = new mongoose.Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    location: {
        type: String,
        required: true
    },
    value: {
        type: Number,
        min: 0
    },
    image: String,
    sq_mt: {
        type: Number,
        min: 0,
        required: true
    }, rooms: {
        type: Number,
        min: 0,
        required: true
    }, floor: {
        type: Number,
        min: 0
    }, short_description: String,
    title: String,
    date: {
        type: String,
        required: false
    },
    geometry: {
        // type: {
        //     type: String,
        //     enum: ['Point'],
        //     required: true
        // },
        coordinates: {
            type: [Number],
            required: true
        }
    }
})


export default mongoose.models.Flat || mongoose.model("Flat", flatSchema);
