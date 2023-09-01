const dogsApi = require('./dogsApi');
const dogsDb = require('./dogsDb');

const getDogs = async (req, res) => {
    try {
        const dogsFromApi = await dogsApi();
        const dogsFromDb = await dogsDb()
        const dogs = [...dogsFromApi, ...dogsFromDb];

        return dogs;
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const getByName = async (req, res) => {
    try {
        const { name } = req.params;
        const dogs = await getDogs();

        const result = dogs.filter(d => d.name
            .toLowerCase() //convertimos en minuscula
            .startsWith(name.toLowerCase())); //para decir desde donde inicia a hacer la comparación
        if(!result) throw new Error('No found dog name');

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message);
    }
}; 

module.exports = {
    getDogs,
    getByName
};