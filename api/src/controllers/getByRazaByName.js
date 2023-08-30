const getDogs  = require('./getAllDogs');
const { Dog } = require('../db');

const getRazaApi = async(req, res) => {
    const { raza } = req.params;
    if(raza.length === 0) throw new Error('Raza query parameter is required');

    try {
        const dogsApi = getDogs();
        const response = dogsApi.map((dog) => 
        dog.name.toLowerCase() === raza.toLowerCase()
        );
        if(response.length === 0) throw new Error('No Found raza in Api');
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const getRazaDb = async(req, res) => {
    const { raza } = req.params;
    if(raza.length === 0) throw new Error('Raza query parameter is required');

    try {
        const dogsDb = Dog.findAll();
        const response = dogsDb.map((dog) => 
        dog.name.toLowerCase() === raza.toLowerCase()
        );
        if(response.length === 0) throw new Error('No Found raza in Db');
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const getByNameApi = async(req, res) => {
    const { name } = req.query;
    if(name.length === 0) throw new Error('Name query parameter is required');

    try {
        const dogsApi = getDogs();
        const response = dogsApi.filter((dog) =>
            dog.name.toLowerCase().includes(name.toLowerCase())
        );
        if(response.length === 0) throw new Error('No dogs found with the provided name');
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

const getByNameDb = async(req, res) => {
    const { name } = req.query;
    if(name.length === 0) throw new Error('Name query parameter is required');

    try {
        const dogsApi = Dog.findAll();
        const response = dogsApi.filter((dog) =>
            dog.name.toLowerCase().includes(name.toLowerCase())
        );
        if(response.length === 0) throw new Error('No dogs found with the provided name');
        res.status(200).json(response);
    } catch (error) {
        res.status(404).json(error.message);
    }
};

module.exports = {
    getRazaApi,
    getRazaDb,
    getByNameApi,
    getByNameDb
}