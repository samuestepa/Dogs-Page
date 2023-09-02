import React from "react";
import style from './Card.module.css';
import { Link } from 'react-router-dom';

const Card = ({ dog }) => {
    const { id, name, image, temperament, weight } = dog;
    return (
        <div className={style.Card}>
            <Link to={`/detail${id}`} className={style.link}>
                <h1>{name}</h1>
                <img src={image} alt="Dog" />
                <p>{ temperament }</p>
                <p>{ weight } Kg</p>
            </Link>
        </div>
    )
};

export default Card;