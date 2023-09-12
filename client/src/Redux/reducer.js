import {
    GET_DOGS,
    SEARCH_DOGS_BY_NAME,
    SEARCH_DOGS_BY_ID,
    GET_TEMPERAMENTS,
    FILTER_BY_TEMPERAMENT,
    FILTER_BY_ORIGIN,
    ORDER,
    SET_PAGE,
    SET_TOTAL_PAGE,
    SET_LOADING,
    SET_CLEAN,
    UPDATE_ORDER,
    CLEAN_FILTER
} from './actionTypes.js'

const initialState = {
    allDogs: [],
    allTemperaments: [],
    filteredData: [],
    currentPage: 1,
    totalPages: 1,
    isLoading: false,
    isClean: false,
    sortOrder: "asc"
}


export default function rootReducer(state = initialState, { type, payload }) {
    switch (type) {
        case GET_DOGS: //Actualiza todos los perros
            return {
                ...state,
                allDogs: payload,
                filteredData: payload,
                sortOrder: "asc"
            };
        case SEARCH_DOGS_BY_NAME: //Actualiza resultados de la busqueda
            return {
                ...state,
                filteredData: payload
            };
        case SEARCH_DOGS_BY_ID: //Actualiza resultados de la busqueda
            return {
                ...state,
                filteredData: payload
            };

        case GET_TEMPERAMENTS: //Actualiza todos los temperamentos
            return {
                ...state,
                allTemperaments: payload
            };
        case FILTER_BY_TEMPERAMENT: { //Filtra por temperamento
            const filterTemperament = payload;
            let filteredDogsData;

            if (filterTemperament === 'all') {
                return {
                    ...state,
                    currentPage: 1,
                    filteredData: state.allDogs,
                };
            }
            filteredDogsData = state.allDogs.filter((dog) =>
                dog.temperament && dog.temperament.includes(filterTemperament)
            );
            console.log(filteredDogsData);
            return {
                ...state,
                currentPage: 1,
                filteredData: filteredDogsData,
                sortOrder: "asc"
            };
        };
        case FILTER_BY_ORIGIN: { //Filtra por origen
            const filterOrigin = payload;
            let filteredDogsData;

            if (filterOrigin === 'all') {
                return {
                    ...state,
                    currentPage: 1,
                    filteredData: state.allDogs,
                };
            }
            if (filterOrigin === 'api') {
                filteredDogsData = state.allDogs.filter((dog) => dog.flag === false);
            }
            if (filterOrigin === 'db') {
                filteredDogsData = state.allDogs.filter((dog) => dog.flag === true);
            };

            return {
                ...state,
                currentPage: 1,
                filteredData: filteredDogsData
            };
        };
        case ORDER: { //Define orden
            const newSortOrder = state.sortOrder === "asc" ? "desc" : "asc";
            const sortedList = [...state.filteredData];
            sortedList.sort((a, b) => {
                if (newSortOrder === "asc") {
                    return a.name.localeCompare(b.name);
                } else {
                    return b.name.localeCompare(a.name);
                }
            });

            return {
                ...state,
                sortOrder: newSortOrder,
                filteredData: sortedList,
            };
        };
        case SET_PAGE: //Actualiza página actual
            return {
                ...state,
                currentPage: payload
            };
        case SET_TOTAL_PAGE: //Actualiza total de páginas
            return {
                ...state,
                totalPages: Math.ceil(state.filteredData.length / 8)
            };
        case SET_LOADING: //Actualiza estado de carga
            return {
                ...state,
                isLoading: payload
            };
        case SET_CLEAN: //Actualiza estado de limpieza
            return {
                ...state,
                isClean: payload
            };
        case UPDATE_ORDER: //Actualiza orden
            return {
                ...state,
                sortedList: payload,
            };
        case CLEAN_FILTER: //Limpia filtros
            return {
                ...state,
                filteredData: state.allDogs,
                sortOrder: "asc",
                totalPages: Math.ceil(state.allDogs.length / 8)
            };
        default:
            return {
                ...state
            };
    }
};