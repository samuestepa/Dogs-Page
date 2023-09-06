import React from 'react'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { filterByTemperament } from '../../redux/actions';

const Temperament = () => {
    const temperaments = useSelector((state) => state.allTemperaments); // Se susbcribe al estado global
    const isLoading = useSelector((state) => state.isLoading)
    const clean = useSelector((state) => state.isClean);

    const dispatch = useDispatch();
    const [selectedTemperament, setSelectedTemperament] = useState("all"); // Se define el estado local

        useEffect(() => {
        if (clean) {
            setSelectedTemperament("all"); // Escucha el estado global, y si es verdadero actualiza el estado local
        }
    }, [clean]);

    const handleOptionSelect = (event) => {
        const option = event.target.value;
        setSelectedTemperament(option); // Actualizar el estado con la opción seleccionada
        dispatch(filterByTemperament(option)); // Enviar la opción seleccionada a la acción
    };

    return (
        <div> Temperaments: {isLoading ? 'Loading...' :
            <select value={selectedTemperament}
                onChange={handleOptionSelect}>
                <option value="all">All</option>
                {temperaments.map((temperament) => (
                    <option key={temperament} value={temperament}>
                    {temperament}
                    </option>
                ))}
            </select>}
        </div>
    )
};

export default Temperament;