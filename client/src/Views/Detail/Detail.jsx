import React, { useEffect, useState } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import style from './Detail.module.css'

const Detail = () => {
    const { id } = useParams();
    const [dog, setDog] = useState({});
    const [error, setError] = useState(null);
    const [isLoading, setisLoading] = useState(true);

    useEffect(() => {
        
    }, [id])
    return (
        <div>

        </div>
    )
};

export default Detail;