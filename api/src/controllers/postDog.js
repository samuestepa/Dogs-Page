const { Dog, Temperament } = require('../db');
const { getDogs } = require('./getAllDogs')

const postDog = async (req, res) => {
    try {
        const { name, image, height, weight, lifeSpan, temperament } = req.body;

        if (!name || !image || !height || !weight || !lifeSpan || !temperament) {
            return res.status(400).json({ error: "Incomplete data" });
        }

        const dogs = await getDogs();
        const dogExist = dogs.find(d => d.name === name);

        if (dogExist) {
            return res.status(400).json({ error: "Dog breed name already exists" });
        }

        let tempExist = await Temperament.findOne({
            where: { name: temperament }
        });

        if (!tempExist) {
            // Si el temperamento no existe, créalo en la base de datos
            tempExist = await Temperament.create({ name: temperament });
        }

        // Crea el perro en la base de datos
        const newDog = await Dog.create({
            name,
            image,
            height,
            weight,
            lifeSpan
        });

        // Asocia el temperamento al perro creado
        await newDog.addTemperament(tempExist);

        return res.status(201).json('El perro ha sido creado');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};


module.exports = postDog;
