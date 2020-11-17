const mongoose = require("mongoose");
const { Schema } = mongoose;

const eventSchema = new Schema({
    eventName: {
        type: String
    },
    city: {
        type: String
    },
    longitude: {
        type: String
    },
    latitude: {
        type: String
    },
    date_created: {
        type: Date,
        default: Date.now,
    },
});

const Event = mongoose.model("events", eventSchema);