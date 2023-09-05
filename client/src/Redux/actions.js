import axios from 'axios';
import { 
    GET_DOGS,
    SEARCH_DOGS_BY_NAME,
    SEARCH_DOGS_BY_ID,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_ORIGIN,
    ORDER,
    CREATE_DOG,
    SET_PAGE,
    SET_TOTAL_PAGE,
    SET_LOADING,
    SET_CLEAN,
    UPDATE_ORDER,
    CLEAN_FILTER } from './actionTypes';

const URL = "http://localhost:3001/dogs";

export const getDogs = () => {
    return async function (dispatch) {
        const response = await axios.get(URL);
        const dogs = response.data;

        dispatch({
            type: GET_DOGS,
            payload: dogs
        });

        dispatch(setTotalPage());
    }
};

export const searchDogsByName = (name) => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(URL + `/name/${name}`);
            const dogByName = response.data;
    
            dispatch({
                type: SEARCH_DOGS_BY_NAME,
                payload: dogByName
            });
            dispatch(setTotalPage());   

        } catch (error) {
            if(error.response.status === 404)
            return alert('No dog breeds found with that name')
        } finally {
            dispatch(setLoading(false))
        }
    }
};

export const searchDogsById = (id) => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            const response = await axios.get(URL + `/${id}`);
            const dogById = response.data;
    
            dispatch({
                type: SEARCH_DOGS_BY_ID,
                payload: dogById
            });
            dispatch(setTotalPage());   

        } catch (error) {
            if(error.response.status === 404)
            return alert(`No dog breeds found with id ${id}`)
        } finally {
            dispatch(setLoading(false))
        }
    }
};

export const getTemperaments = () => {
    return async function (dispatch) {
        try {
            dispatch(setLoading(true));
            const response = await axios("http://localhost:3001/temperaments");
            const temperaments = response.data;

            dispatch({
                type: GET_TEMPERAMENTS,
                payload: temperaments
            });
        } catch (error) {
            alert('No found temperaments');
        } finally {
            dispatch(setLoading(false))
        }
    }
};

export const filterByTemperament = (option) => {
    return (dispatch) => {
            dispatch({
                type: FILTER_BY_TEMPERAMENT,
                payload: option
            });
            dispatch(setTotalPage())
    }
};

export const filterByOrigin = (option) => {
    return (dispatch) => {
        dispatch({
            type: FILTER_BY_ORIGIN,
            payload: option
        })
    }
};
// Define ordenamiento
export const order = () => ({
    type: ORDER
});

export const createDog = (payload) => {
    return async function (dispatch) {
        try {
            const service = await axios.post('http://localhost:3001/create', payload)

            dispatch({
                type: CREATE_DOG,
                payload,
            });

            if (service.status === 201) {
                dispatch(getDogs());
                return alert('Succesfully created')
            }
        } catch (error) {
            if (error.response.status === 400) {
                return alert('Dog breeds name already exists')
            }
            if (error.response.status === 404) {
                return alert('Internal server error')
            }
        }
    }
};

// Definir página actual
export const setPage = (pageNumber) => ({
    type: SET_PAGE,
    payload: pageNumber,
});

// Definir el total de páginas
export const setTotalPage = () => {
    return {
        type: SET_TOTAL_PAGE
    }
};

// Actualiza estado de carga
export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});

// Actualiza estado de limpieza
export function setClean(isClean) {
    return {
        type: SET_CLEAN,
        payload: isClean
    }
};

// Actualiza ordenamiento
export const updateOrder = (sortedList) => ({
    type: UPDATE_ORDER,
    payload: sortedList,
});

// Limpiar filtros
export function cleanFilter() {
    return async function (dispatch) {
        try {            
            dispatch(setClean(true));

            dispatch({
                type: CLEAN_FILTER,
            });

            dispatch(setTotalPage());

            await new Promise(resolve => setTimeout(resolve, 1000))

            dispatch(setClean(false));
        } catch (error) {
            console.log(error)
        }
    }
};