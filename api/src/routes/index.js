const { Router } = require('express');
const {
        getDogsHandler,
        getRazaApiHandler, 
        getRazaDbHandler, 
        getByNameApiHandler, 
        getByNameDbHandler
} = require('../handlers/dogHandler');
const getTemperamentHandler = require('../handlers/temperamentHandler');
const postDog = require('../controllers/postDog');

const router = Router();

router.get('/', getDogsHandler);
router.get('/:idRazaApi', getRazaApiHandler);
router.get('/:idRazaDb', getRazaDbHandler);
router.get('/nameApi', getByNameApiHandler);
router.get('/nameDb', getByNameDbHandler);
router.get('/temperaments', getTemperamentHandler);
router.post('/create', postDog);

module.exports = router;
