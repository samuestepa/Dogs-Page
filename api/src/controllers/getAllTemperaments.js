const { Temperamemt } = require('../db');

const getTemperaments = async() => {
    try {
        const temperament = await Temperamemt.findAll({
            //de sequelize
            attributes: ['name'], // Obtener solo la columna 'name'
            raw: true, // Obtener resultados como objetos planos
            group: ['name'] // Agrupar por 'name' para obtener valores únicos   
        });
        const dogsTemperament = temperament.map(t => t.name);
        
        res.status(200).json(dogsTemperament);
    } catch (error) {
        res.status(404).json({ error: 'Error fetching data from DB', message: error.message });
    }
};

module.exports = getTemperaments;