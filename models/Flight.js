const mongoose = require('mongoose')

const destinationSchema = new mongoose.Schema({
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    arrival: {
        type: Date,
        default: function() {
            return new Date()
        }
    }
})

const flightSchema = new mongoose.Schema({
    airline: {
        type: String,
        enum: ['American', 'Southwest', 'United'],
        required: true
    },
    airport: {
        type: String,
        enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
        default: 'DEN'
    },
    flightNo: {
        type: Number,
        required: true,
        min: 10,
        max: 9999

    },
    departs: {
        type: Date,
        default: function() {
            return new Date()
        }
    },
    destinations: [destinationSchema],
    tickets: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Ticket'
    }
})

module.exports = mongoose.model('Flight', flightSchema)