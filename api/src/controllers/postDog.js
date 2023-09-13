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

        /* let tempExist = await Temperament.findOne({ //Busca en Temperament un campo name que coincida con el valor de temperament
            where: { name: temperament }
        });

        if (!tempExist) {
            // Si el temperamento no existe, créalo en la base de datos
            tempExist = await Temperament.create({ name: temperament });
        }
 */
        const tempExist = await Promise.all(
            temperament.map((temperamentId) =>
                Temperament.findByPk(temperamentId)));

        // Valida que el temperamento exista
        if (tempExist.some((t) => !t))
            return res.status(404).json({ error: "Temperament does not exist" });

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

       res.status(201).json('Create Successful');
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = postDog;
