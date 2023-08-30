const axios = require('axios');
const { Temperament } = require('../db');
const URL = 'https://api.thedogapi.com/v1/breeds';

const getTemperaments = async() => {
    try {
        const response = await axios.get(URL);
        const dogsApi = response.data;

        for (const dog of dogsApi) {
            if (dog.temperament) {
                const temperaments = dog.temperament.split(', ').filter(Boolean);
                for (const temp of temperaments) {
                    await Temperament.findOrCreate({
                        where: { name: temp },
                        defaults: { name: temp }
                    });
                }
            }
        }

        const temperamentsDb = await Temperament.findAll({
            attributes: ['name'],
            raw: true,
            group: ['name']
        });

        temperamentsDb.map(t => t.name);
        
        res.status(200).json(temperamentsDb);
    } catch (error) {
        res.status(404).json({ error: 'Error fetching temperaments', message: error.message });
    }
};

module.exports = getTemperaments;