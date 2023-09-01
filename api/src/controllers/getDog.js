const { getDogs } = require('./getAllDogs');

const getDog = async (req, res) => {
    try {
        const { id } = req.params
        const dogs = await getDogs();

        const result = await dogs.find(d => d.id === id || d.id === Number(id));
        if(!result) throw new Error('No found dog id');

        res.status(200).json(result);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

module.exports = getDog;