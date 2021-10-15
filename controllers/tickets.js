const Flight = require('../models/Flight')
const Ticket = require('../models/Ticket')

module.exports = {
    new: newTicket,
    create,
    edit,
    update,
    delete: deleteTicket
}

function newTicket(req, res) {
    res.render('tickets/new', {flightId: req.params.id})
}

function create(req, res) {
    req.body.price = parseInt(req.body.price)
    req.body.flight = req.params.id

    const ticket = new Ticket(req.body)
    ticket.save()
    Flight.findById(req.params.id, function(err, flight) {
        if(err) res.redirect(`/flights/${req.params.id}/tickets/new`)
        flight.tickets.push(ticket._id)
        flight.save(function(err, flight) {
            res.redirect(`/flights/${req.params.id}`)
        })
    })
}

function edit(req, res) {
    Ticket.findById(req.params.id, function(err, ticket) {
        res.render('tickets/edit', { ticket })
    })
}

function update(req, res) {
    req.body.price = parseInt(req.body.price)

    Ticket.findByIdAndUpdate(req.params.id, {seat: req.body.seat, price: req.body.price}, function(err, ticket) {
        if(err) res.redirect(`tickets/${req.params.id}/edit`)
        res.redirect(`/flights/${ticket.flight.toString()}`)
    })
}

function deleteTicket(req, res) {
    Ticket.findByIdAndDelete(req.params.id, function(err, ticket) {
        if(err) res.redirect(`tickets/${req.params.id}/edit`)
    
        Flight.findById( flight => {
            const index = flight.tickets.findindex( t => t._id.toString() === req.params.id)
            flight.tickets.splice(index, index+1)
            flight.save(function(err, f) {
            })
        })
        res.redirect(`/flights/${ticket.flight.toString()}`)
    })
}