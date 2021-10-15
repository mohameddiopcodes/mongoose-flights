const moment = require('moment')
const Flight = require('../models/Flight')

module.exports = {
    create,
    edit,
    update,
    delete: deleteDestination
}

function create(req, res) {
    req.body.arrival = new Date(req.body.arrival)
    Flight.findById(req.params.id, function(err, flight) {
        if(err) res.redirect(`/flights/${req.params.id}`)
        flight.destinations.push(req.body)
        flight.save(function(err, f) {
            res.redirect(`/flights/${req.params.id}`)
        })
    })
}

function edit(req, res) {
    Flight.findOne({'destinations.id': req.params.id}, function(err, flight) {
        if(err) res.redirect(`/destinations/${req.params.id}/edit`)
        const destination = flight.destinations.find(dest => dest._id.toString() === req.params.id)
        res.render('destinations/edit', { destination, moment })
    })
}

function update(req, res) {
    req.body.arrival = new Date(req.body.arrival)
    Flight.findOne( {'destinations.id': req.params.id} , function(err, flight) {
        if(err) res.redirect(`/destinations/${req.params.id}/edit`)
        const index = flight.destinations.findIndex(dest => dest._id.toString() === req.params.id)
        flight.destinations.splice(index, index+1, req.body)
        flight.save(function(err, f) {
            res.redirect(`/flights/${flight._id.toString()}`)
        })
    })
}

function deleteDestination(req, res) {
    Flight.findOne( {'destinations.id': req.params.id} , function(err, flight) {
        if(err) res.redirect(`/destinations/${req.params.id}/edit`)
        const index = flight.destinations.findIndex(dest => dest._id.toString() === req.params.id)
        flight.destinations.splice(index, index+1)
        flight.save(function(err, f) {
            res.redirect(`/flights/${flight._id.toString()}`)
        })
    })
}