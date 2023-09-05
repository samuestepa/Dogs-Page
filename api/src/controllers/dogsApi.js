const axios = require('axios');

const dogsApi = async (req, res) => {
    try {
        const dogsApi = await axios.get('https://api.thedogapi.com/v1/breeds');
        const results = dogsApi.data.map((dog) => ({
            id: dog.id,
            image: dog.reference_image_id,
            name: dog.name,
            height: dog.height.metric,
            weight: dog.weight.metric,
            lifeSpan: dog.life_span,
            temperament: dog.temperament,
            flag: false
        }));
        if(!dogsApi.length === 0) throw new Error('Error fetching data from API');
        
        return results;
    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = dogsApi;