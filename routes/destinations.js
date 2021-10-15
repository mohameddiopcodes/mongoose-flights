const express = require('express')
const router = express.Router()

const destinationsCtrl = require('../controllers/destinations')

router.post('/flights/:id/destinations', destinationsCtrl.create)

router.get('/destinations/:id/edit', destinationsCtrl.edit)

router.put('/destinations/:id', destinationsCtrl.update)

router.delete('/destinations/:id', destinationsCtrl.delete)

module.exports = router