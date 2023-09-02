import React from "react";
import Card from "../Card/Card";
import style from './Cards.module.css';
import { connect } from 'react-redux';

const Cards = ({ currentPage, dogsXPage, dogs }) => {
    //Calcula los índices de inicio y final para determinar qué perros deben mostrarse en la página
    const startIndex = (currentPage - 1) * dogsXPage;
    const endIndex = startIndex + dogsXPage;
    const dogsToShow = dogs.slice(startIndex, endIndex);

    return (
        <div className={style.Cards}>
            {
                dogsToShow.map((dog) => {
                    return (
                        <Card
                            key={dog.id}
                            dog={dog}
                        />
                    )
                })
            }
        </div>
    )
};

const mapStateToProps = (state) => ({
    currentPage: state.currentPage,
    dogsXPage: 8
});

export default connect(mapStateToProps)(Cards);