import React from "react";
import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import validations from './validations';
import style from './Form.module.css';
import { createDog } from '../../redux/actions';

const Form = () => {
    const dispatch = useDispatch();
    const temperaments = useSelector((state) => state.allTemperaments);
    const [error, setError] = useState({}); 
    const [formData, setFormData] = useState({
        image: '',
        name: '',
        heightMin: '',
        heightMax: '',
        weightMin: '',
        weightMax: '',
        lifeSpan: '',
        temperament: []
    });
    const [formTouched, setFormTouched] = useState(false);

    useEffect(() => {
        if(formTouched) setError(validations(formData))
    }, [formData, formTouched]);

    //Para cambios en el formulario
    const handleChange = (event) => {
        const { name, value } = event.target;
        const validationErrors = validations({...formData, [name]: value});
        setError(validationErrors);
        setFormData((prevFormData) => ({...prevFormData, [name]: value}));
        setFormTouched(true);
    };
console.log(formData);
    //Agregar o quitar temperamentos seleccionados en el dropdown
    const handleTemperamentChange = (event) => {
        const selectValue = event.target.value;
        if(!formData.temperament.includes(selectValue))
        setFormData((prevFormData) => ({...prevFormData, temperament: [...prevFormData.temperament, selectValue]}));
    };

    //Identificar temperamentos seleccionados
    const handleSelectTemperament = () => {
        const dropDown = document.getElementById('temperamentsDropdown');
    };

    //Remover elementos seleccionados
    const handleRemoveTemperament = (selectedValue) => {
        setFormData((prevFormData) => ({
            ...prevFormData, temperament: prevFormData.temperament.filter((temperament) => temperament !== selectedValue)
        }))
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        let aux = Object.keys(error);
        if(aux.length === 0) {
            // Si no hay errores de validación, se reinicia el formulario y se envían los datos al servidor.
            setFormData({
                image: '',
                name: '',
                heightMin: '',
                heightMax: '',
                weightMin: '',
                weightMax: '',
                lifeSpan: '',
                temperament: []
            });
            const validationErrors = validations(formData);
            setError(validationErrors);

            // Construcción del body para la petición de creación de nuevo perro
            const payload = {
                image: formData.image,
                name: formData.name,
                height: `${formData.heightMin} - ${formData.heightMax}`,
                weight: `${formData.weightMin} - ${formData.weightMax}`,
                life_span: `${formData.lifeSpan} years`,
                temperament: formData.temperament,
            }
            console.log(payload)
            dispatch(createDog(payload))
            setFormTouched(false)
        } else {
            return alert(error)
        }
    };

    const isSubmitDisabled = Object.keys(error).length > 0 || !formTouched;
console.log(error);
    return (
        <div>
        <div className={style.bar}>
            <h1 className={style.title}>Create a new breed dog</h1>
            <Link to={`/home`}>
                <button className={style.back}>✖</button>
            </Link>
        </div>
        <div className={style.new}>
            <form className={style.form} onSubmit={handleSubmit}>
                <label>Image (url): <input
                    type="text" key="image" name="image" value={formData.image}
                    onChange={handleChange} onBlur={handleChange} /> </label>
                <span>{error?.image && error.image}</span>
                <br />
                <label>Name: <input
                    type="text" key="name" name="name" value={formData.name}
                    onChange={handleChange} /> </label>
                <span>{error?.name && error.name}</span>
                <br />
                <label>Minimun height (cm): <input
                    type="number" key="heightMin" name="heightMin" onChange={handleChange}
                    value={formData.heightMin} /> </label>
                <span>{error?.heightMin && error.heightMin}</span>
                <br />
                <label>Maximun height (cm): <input
                    type="number" key="heightMax" name="heightMax" onChange={handleChange}
                    value={formData.heightMax} /> </label>
                <span>{error?.heightMax && error.heightMax}</span>
                <br />
                <label>Mininum weight (kg): <input
                    type="number" key="weightMin" name="weightMin" onChange={handleChange}
                    value={formData.weightMin} /></label>
                <span>{error?.weightMin && error.weightMin}</span>
                <br />
                <label>Maximun weight (kg): <input
                    type="number" key="weightMax" name="weightMax" onChange={handleChange}
                    value={formData.weightMax} /></label>
                <span>{error?.weightMax && error.weightMax}</span>
                <br />
                <label>Life span (years): <input
                    type="number" key="lifeSpan" name="lifeSpan" onChange={handleChange}
                    value={formData.lifeSpan} /></label>
                <span>{error?.lifeSpan && error.lifeSpan}</span>
                <br />
                <label>
                    Temperaments:
                    <div onClick={handleSelectTemperament}>
                        <select id="temperamentsDropdown" multiple value={formData.temperament} onChange={handleTemperamentChange}>
                            {temperaments.map((temperament) => (
                                <option key={temperament.id} value={temperament.id}>
                                    {temperament.name}
                                </option>
                            ))}
                        </select>
                        <div className={style['selected-values']}>
                            {formData.temperament.map((selectedValue) => {
                                const selectedTemperament = temperaments.find((temperament) => temperament.id === selectedValue);
                                return (
                                    <div key={selectedValue} className={style['selected-temperament']}>
                                        {selectedTemperament}{' '}
                                        <button type="button" onClick={() => handleRemoveTemperament(selectedValue)}>
                                            ✖
                                        </button>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                    <span>{error?.temperament && error.temperament}</span>
                </label>
                <br />
                {!isSubmitDisabled ? (
                    <button type='submit'>Send</button>
                ) : (
                    <span>Form is empty or contains error</span>
                )}
            </form>
        </div>
    </div>
    )
};

export default Form;