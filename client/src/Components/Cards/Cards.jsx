import React from 'react'
import Card from '../Card/Card'
import style from '../Cards/Cards.module.css'
import { connect } from 'react-redux';

const Cards = ({ currentPage, dogsPerPage, dogs }) => {

    if (!Array.isArray(dogs)) return null;

    //Se calculan los índices de inicio y final para determinar qué perros deben mostrarse en la página
    const startIndex = (currentPage - 1) * dogsPerPage;
    const endIndex = startIndex + dogsPerPage;
    const dogsToShow = dogs.slice(startIndex, endIndex);

    return (
        <div className={style.cards}>
            {dogsToShow.map((dog) => {
                return (
                    <Card
                        key={dog.id}
                        dog={dog}
                    />)
            })}
        </div>
    )
};   

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    dogsPerPage: 8
});

export default connect(mapStateToProps)(Cards);