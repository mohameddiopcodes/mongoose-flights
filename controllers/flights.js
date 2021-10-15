module.exports = {
    index,
    new: newFlight,
    create,
    show,
    edit,
    update,
    delete: deleteFlight
}

const Flight = require('../models/Flight')
const moment = require('moment')

function index(req, res) {
    Flight.find({}, (err, flights) => {
        res.render('flights/index', { flights })
    })
}

function newFlight(req, res) {
    res.render('flights/new', {err: false, moment})
}

function create(req, res) {
    req.body.departs = new Date(req.body.departs)
    req.body.flightNo = parseInt(req.body.flightNo)
    const flight = new Flight(req.body)
    flight.save((err) => {
        if(err) res.redirect('/flights/new', {err})
    })
    res.redirect('/flights')
}

function show(req, res) {
    Flight.findById(req.params.id)
        .populate('tickets')
        .exec(function(err, flight) {
            res.render('flights/show', { flight, moment })
        })
}

function edit(req, res) {
    Flight.findById(req.params.id, (err, flight) => {
        res.render('flights/edit', {err: false, flight, moment})
    })
}

function update(req, res) {
    req.body.departs = new Date(req.body.departs)
    req.body.flightNo = parseInt(req.body.flightNo)
    Flight.findByIdAndUpdate(req.params.id, req.body,
        (err, flight) => {
            if(err) res.redirect(`/flights/${req.params.id}/edit`)
            res.redirect(`/flights/${req.params.id}`)
        }
    )
}

function deleteFlight(req, res) {
    Flight.findByIdAndDelete(req.params.id,
        (err, flight) => {
            if(err) res.redirect(`flights/edit/${flight._id}`, {err})
            res.redirect('/flights')
        }
    )
}