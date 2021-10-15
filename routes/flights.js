const express = require('express');
const router = express.Router();
const flightsCtrl = require('../controllers/flights')

/* GET users listing. */
router.get('/', flightsCtrl.index)
router.get('/new', flightsCtrl.new)
router.get('/edit/:id', flightsCtrl.edit)
router.get('/:id', flightsCtrl.show)
router.post('/', flightsCtrl.create)
router.put('/:id', flightsCtrl.update)
router.delete('/:id', flightsCtrl.delete)

module.exports = router;
