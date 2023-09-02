import axios from 'axios';
import { 
    GET_DOGS,
    SEARCH_DOGS_BY_NAME,
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
    CLEAN_FILTER } from "./actionTypes";

const URL = "http://localhost:3001/dogs";

export const getDogs = () => {
    return async function (dispatch) {
        const response = axios.get(URL);
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
            const response = axios.get(URL + `/name/${name}`);
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
// define ordenamiento
export const order = () => ({
    type: ORDER
});

export const createDog = (payload) => {
    return async function (dispatch) {
        try {
            const service = await axios.post(URL, payload)

            dispatch({
                type: CREATE_DOG,
                payload,
            });

            if (service.status === 201) {
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

// Acción para traer definir página actual
export const setPage = (pageNumber) => ({
    type: SET_PAGE,
    payload: pageNumber,
});

// Acción para traer definir el total de páginas
export const setTotalPage = () => {
    return {
        type: SET_TOTAL_PAGE
    }
};

// Acción para actualizar estado de carga
export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});

// Acción para actualizar estado de limpieza
export function setClean(isClean) {
    return {
        type: SET_CLEAN,
        payload: isClean
    }
};

// Acción para actualizar ordenamiento
export const updateSortedList = (sortedList) => ({
    type: UPDATE_ORDER,
    payload: sortedList,
});

// Acción para limpiar filtros
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