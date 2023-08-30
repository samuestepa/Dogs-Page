const getDogs = require('../controllers/getAllDogs');
const { getRazaApi, 
        getRazaDb, 
        getByNameApi, 
        getByNameDb } = require('../controllers/getByRazaByName');

const getDogsHandler = async (req, res) => {
    try {
        const dogs = await getDogs();
        res.status(200).json(dogs);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching dogs data' });
    }
};

const getRazaApiHandler = async (req, res) => {
    try {
        const razaApiData = await getRazaApi();
        res.status(200).json(razaApiData);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching raza data from API' });
    }
};

const getRazaDbHandler = async (req, res) => {
    try {
        const razaDbData = await getRazaDb();
        res.status(200).json(razaDbData);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching raza data from DB' });
    }
};

const getByNameApiHandler = async (req, res) => {
    try {
        const byNameApiData = await getByNameApi();
        res.status(200).json(byNameApiData);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching data by name from API' });
    }
};

const getByNameDbHandler = async (req, res) => {
    try {
        const byNameDbData = await getByNameDb();
        res.status(200).json(byNameDbData);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching data by name from DB' });
    }
};

module.exports = {
        getDogsHandler,
        getRazaApiHandler, 
        getRazaDbHandler, 
        getByNameApiHandler, 
        getByNameDbHandler
};
