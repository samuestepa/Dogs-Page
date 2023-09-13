const { getDogs, getByName } = require('../controllers/getAllDogs');
const getDog = require('../controllers/getDog');


const getDogsHandler = async (req, res) => {
    try {
        const dogs = await getDogs();
        res.status(200).json(dogs);
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching dogs data' });
    }
};

const getDogByIdHandler = async (req, res) => {
    try {
        const dogById = await getDog(req, res);
        return dogById;
    } catch (error) {
        res.status(500).json(error.message);
    }
};

const getDogByNameHandler = async (req, res) => {
    try {
        const dogByName = await getByName(req, res);
        return dogByName;
    } catch (error) {
        res.status(500).json({ error: 'Error while fetching dog by name' });
    }
};

module.exports = {
        getDogsHandler,
        getDogByNameHandler,
        getDogByIdHandler
};
