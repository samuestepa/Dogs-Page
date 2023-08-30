const { Dog, Temperament } = require('../db');
const { getDogs } = require('./getAllDogs')

const postDog = async(req, res) => {
    const { id, name, image, height, weight, lifeSpan, temperament } = req.body;
    if(!id || 
        !name || 
        !image || 
        !height || 
        !weight || 
        !lifeSpan || 
        !temperament) throw new Error('Incomplete Data');
    try {
        const dogs = await getDogs();
        const searchDog = dogs.find(dog => dog.name === name);
        if(searchDog) throw new Error('A dog with the same name already exists');
        
        const temperaments = await Temperament.findAll();
        const temperamentExists = temperaments.some(temp => temp.name === temperament);
        if (!temperamentExists) throw new Error('The specified temperament does not exist');
        
        const newDog = await Dog.create({
            name,
            image,
            height,
            weight,
            lifeSpan
        });

        await newDog.setTemperament(temperament);

        res.status(200).json({ message: 'Dog created successfully' });
    } catch (error) {
        res.status(404).json(error.message)
    }
};

module.exports = postDog;