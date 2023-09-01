const { Temperament, Dog } = require('../db');

const dogsDB = async (req, res) => {
    try {
        const data = await Dog.findAll({
            include: {
                model: Temperament,
            },
        });
        const dogsData = data.map((dog) => {
            const temperaments = dog.temperaments.map((temperament) => temperament.name);
            dog.dataValues.temperament = temperaments.join(', ');
            delete dog.dataValues.temperaments;
            return dog;
        });

        return dogsData;
    } catch (error){
        res.status(404).json(error.message);
    }
};

module.exports = dogsDB