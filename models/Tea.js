const mongoose = require("mongoose");

const teaSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ["Green", "Black", "Herbal", "Matcha", "Oolong"], required: true },
    origin: { type: String, required: true },
    flavorNotes: [String],
    description: { type: String },
    brewingTemp: { type: String },
    brewingTime: { type: String },
    price: { type: Number, required: true },
    image: { type: String },
    featured: { type: Boolean, default: false }
});

module.exports = mongoose.model("Tea", teaSchema);
