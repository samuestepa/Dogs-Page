const getTemperaments = require('../controllers/getAllTemperaments');

const getTemperamentHandler = async(req, res) => {
    try {
        const temperament = await getTemperaments();
        res.status(200).json(temperament);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error in temperaments handler' });
    }
};

module.exports = getTemperamentHandler;