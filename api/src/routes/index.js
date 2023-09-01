const { Router } = require('express');
const {
        getDogsHandler,
        getDogByNameHandler,
        getDogByIdHandler
} = require('../handlers/dogHandler');
const getTemperamentHandler = require('../handlers/temperamentHandler');
const postDog = require('../controllers/postDog');

const router = Router();

router.get('/dogs', getDogsHandler);
router.get('/dogs/:id', getDogByIdHandler);
router.get('/dogs/name/:name', getDogByNameHandler);
router.get('/temperaments', getTemperamentHandler);
router.post('/create', postDog);

module.exports = router;
