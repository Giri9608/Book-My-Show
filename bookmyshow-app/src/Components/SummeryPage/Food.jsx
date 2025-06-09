import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFood, storeSelectedFood } from '../../Redux/food/actions';
import styles from '../Styling/Food.module.css';
import FoodCard from './FoodCard';

const init = {
    all: true,
    combo: false,
    snacks: false,
    beverages: false,
    popcorn: false,
};

const Food = () => {
    const dispatch = useDispatch();
    const foods = useSelector((state) => state.food.foods);
    const [filteredFood, setFilteredFood] = useState([]);
    const [active, setActive] = useState(init);
    const [selectedFood, setSelectedFood] = useState([]);

    useEffect(() => {
        dispatch(getFood());
        handleFilter('ALL');
    }, [dispatch, handleFilter]);

    useEffect(() => {
        setFilteredFood(foods);
    }, [foods]);

    useEffect(() => {
        const temp = filteredFood.filter((item) => item.count > 0);
        setSelectedFood(temp);
        dispatch(storeSelectedFood(temp));
    }, [filteredFood, dispatch]);

    const handleFilter = (text) => {
        let updated = foods;
        let newActive = { ...init };

        if (text === 'CO') {
            updated = foods.filter((item) => item.is_combo);
            newActive = { ...newActive, combo: true };
        } else if (text === 'SN') {
            updated = foods.filter((item) => item.is_coke);
            newActive = { ...newActive, snacks: true };
        } else if (text === 'BE') {
            updated = foods.filter((item) => item.is_beverage); // Assumed is_beverage exists
            newActive = { ...newActive, beverages: true };
        } else if (text === 'PO') {
            updated = foods.filter((item) => item.is_popcorn);
            newActive = { ...newActive, popcorn: true };
        } else {
            newActive = { ...newActive, all: true };
        }

        setFilteredFood(updated);
        setActive(newActive);
    };

    const handleCount = (id, val) => {
        if (selectedFood.length >= 5 && val > 0) {
            alert('Only 5 items per user');
            return;
        }
        const updated = filteredFood.map((item) =>
            item._id === id
                ? { ...item, count: Math.max(0, item.count + val) }
                : item
        );
        setFilteredFood(updated);
    };

    return (
        <div className={styles.container}>
            <img
                src="https://in.bmscdn.com/bmsin/fnb/offerbanner/web/web-offerbanner.jpg"
                alt="banner"
            />
            <div className={styles.wrapper}>
                <div>
                    Grab a <a href="/offers">bite!</a>
                </div>
                <span className={styles.span}>
                    Prebook Your Meal and<span> Save More!</span>
                </span>
                <div className={styles.filters}>
                    <span
                        style={
                            active.all
                                ? { color: 'white', background: '#F84464', border: 'none' }
                                : {}
                        }
                        onClick={() => handleFilter('ALL')}
                    >
                        ALL
                    </span>
                    <span
                        style={
                            active.combo
                                ? { color: 'white', background: '#F84464', border: 'none' }
                                : {}
                        }
                        onClick={() => handleFilter('CO')}
                    >
                        COMBOS
                    </span>
                    <span
                        style={
                            active.snacks
                                ? { color: 'white', background: '#F84464', border: 'none' }
                                : {}
                        }
                        onClick={() => handleFilter('SN')}
                    >
                        SNACKS
                    </span>
                    <span
                        style={
                            active.beverages
                                ? { color: 'white', background: '#F84464', border: 'none' }
                                : {}
                        }
                        onClick={() => handleFilter('BE')}
                    >
                        BEVERAGES
                    </span>
                    <span
                        style={
                            active.popcorn
                                ? { color: 'white', background: '#F84464', border: 'none' }
                                : {}
                        }
                        onClick={() => handleFilter('PO')}
                    >
                        POPCORN
                    </span>
                </div>
                <div className={styles.cards}>
                    {filteredFood?.map((item) => (
                        <FoodCard
                            key={item._id}
                            {...item}
                            handleCount={handleCount}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Food;
