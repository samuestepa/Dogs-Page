const axios = require('axios');
const { Dog } = require('../db.js');
const URL = 'https://api.thedogapi.com/v1/breeds';

const getDogs = async (req, res) => {
    try {
        const response = await axios.get(URL);
        const dogsApi = response.data.map((dog) => ({
            id: dog.id,
            image: dog.reference_image_id,
            name: dog.name,
            height: dog.height,
            weight: dog.weight,
            lifeSpan: dog.life_span,
            flag: false
        }));
        if(!dogsApi.lenght === 0) throw new Error('Error fetching data from API');

        const dogsDb = await Dog.findAll();
        if(!dogsDb.lenght === 0) throw new Error('Error fetching data from DB');

        const dogs = [...dogsApi, ...dogsDb];

        res.status(200).json(dogs);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

module.exports = getDogs;