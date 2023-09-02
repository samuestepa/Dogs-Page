import React from "react";
import style from './Landing.module.css';
import { Link } from "react-router-dom";
import dogImage from '../../img/landing.jpg'

const Landing = () => {
    return (
        <div className={style.landing}>
            <img src={dogImage} alt='Dog'></img>
            <div className={style.container}>
                <h1>Dogs</h1>
                <Link to={`/home`} className={style.link}>
                    <button>Click here to start search</button>
                </Link>        
            </div>
        </div>
    )
};

export default Landing;