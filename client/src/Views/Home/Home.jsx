import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getDogs } from '../../redux/actions';
import Cards from '../../components/Cards/Cards'
import Nav from '../../components/Nav/Nav';
import Paginator from '../../components/Paginator/Paginator';

const Home = () => {
    const dispatch = useDispatch();
    const dogs = useSelector((state) => state.filteredData);

    useEffect(() => {
        dispatch(getDogs());
    }, [dispatch])

    return (
        <div>
            <Nav />
            <Cards dogs={dogs} />
            {Array.isArray(dogs) && dogs.length > 0 ? (
                <Paginator />
            ) : (<h1>Dogs not found</h1>)}
        </div>
    )
};

export default Home;