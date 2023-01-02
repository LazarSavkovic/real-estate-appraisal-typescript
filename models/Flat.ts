import mongoose from 'mongoose'

const opts = {toJSON: {virtuals: true}}

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
        min: 0,
        // required: true
    },
    // price_by_surface: Number,
    image: String,
    // subtitle_places: [String],
    // features: [String],
    sq_mt: {
        type: Number,
        min: 0,
        // required: true
    }, rooms: {
        type: Number,
        min: 0,
        required: true
    }, floor: {
        type: Number,
        min: 0
    }, short_description: String,
    title: String,
    date: String,
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    }
}, opts)

flatSchema.virtual("properties.popUpMarkup").get(function() {
    return `<a href="/apts/${this._id}" class="map-popup-link"><p class="lead">${this.title}</p></a><p>Procenjena vrednost:<br>${this.value} €</p>`
});

export default mongoose.models.Flat || mongoose.model("Flat", flatSchema);
