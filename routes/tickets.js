const express = require('express')
const router = express.Router()

const ticketsCtrl = require('../controllers/tickets')

router.get('/flights/:id/tickets/new', ticketsCtrl.new)

router.post('/flights/:id/tickets', ticketsCtrl.create)

router.get('/tickets/:id/edit', ticketsCtrl.edit)

router.put('/tickets/:id', ticketsCtrl.update)

router.delete('/tickets/:id', ticketsCtrl.delete)

module.exports = router