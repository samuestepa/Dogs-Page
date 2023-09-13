import React from "react";
import dogImage from '../../img/landing2.png'
import style from './Landing.module.css'
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <div className={style.landing}>
            <img src={dogImage} alt='Dog'></img>
            <div className={style.container}>
                <h1>Dogs</h1>
                <Link to={`/home`} className={style.link}>
                    <button>Start</button>
                </Link>        
            </div>
        </div>
    )
};

export default Landing;