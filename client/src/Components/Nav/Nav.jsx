import React from 'react';
import { Link } from 'react-router-dom';
import { getTemperaments } from '../../redux/actions';
import { useDispatch } from "react-redux";
import { useEffect } from 'react';
import style from './Nav.module.css';
import SearchBar from '../../components/SearchBar/SearchBar';
import Origin from '../Origin/Origin';
import Temperament from '../Temperament/Temperament';
import Sort from '../Sort/Sort';

const Nav = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTemperaments());
    }, [dispatch])

    return (
        <div className={style.nav}>
            <Link to={`/`} >
                <button>🡰</button>
            </Link>
            <Link to={`/create`}>
                <button>Create</button>
            </Link>
            <Sort />
            <Temperament />
            <Origin />
            <SearchBar />
        </div>
    )
};

export default Nav;