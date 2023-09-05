import React, { useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './Detail.module.css';
import { searchDogsById } from '../../redux/actions';

const Detail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const dog = useSelector((state) => state.filteredData);

    useEffect(() => {
        dispatch(searchDogsById(id))
    }, [dispatch])

    return (
        <div className={styles.detail}>
            <div className={styles.titleDetail}>
                <h1 className={styles.title}>Breed detail</h1>
                <Link to={'/home'}>
                    <button className={styles.back}>✖</button>
                </Link>
            </div>
            <div className={styles.detailContent}>
                <div className={styles.imageDetail}>
                    
                    <img src={`https://cdn2.thedogapi.com/images/${dog.image}.jpg`} alt={dog.name} className={styles.imageDog} />
                </div>
                <div className={styles.box}>
                    <h1 className={styles.titleDog}>{dog.name}</h1>
                    <h3>ID: {dog.id}</h3>
                    <h3>Height: {dog.height} cm</h3>
                    <h3>Weight: {dog.weight} kg</h3>
                    <h3>Temperaments: {dog.temperament}</h3>
                    <h3>Life span: {dog.life_span}</h3>
                </div>
            </div>
        </div>
    )
};

export default Detail;