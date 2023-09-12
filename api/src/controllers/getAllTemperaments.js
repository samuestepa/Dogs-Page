const { Temperament } = require('../db');
const { getDogs } = require('./getAllDogs');

const getTemperaments = async(req, res) => {
    try {
        const dogsApi = await getDogs();

        const temperamentsApi = dogsApi
            .map((dog) => dog.temperament) // Obtén la lista de temperamentos de los perros
            .filter((temperament) => !!temperament) // Filtra los temperamentos que no están definidos
            .flatMap((temperament) => temperament.split(', ')) // Separa los temperamentos por comas y crea un array plano
            .map((temperament) => temperament.trim()) // Quita espacios en blanco
            .filter((temperament) => temperament.length > 2); // Filtra los temperamentos con más de 2 caracteres

        const uniqueTemperaments = [...new Set(temperamentsApi)]; // Elimina duplicados

        for (const temperament of uniqueTemperaments) {
            await Temperament.findOrCreate({ //método de sequelize
                where: { name: temperament }
            });
        }

        const temp = await Temperament.findAll();
        const totalTemp = temp.sort((a, b) => a.name.localeCompare(b.name)); // metodo para ordenar de A a Z
        return totalTemp;
    } catch (error) {
        res.status(404).json({ error: 'Error fetching temperaments', message: error.message });
    }
};

module.exports = getTemperaments;