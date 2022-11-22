import React, { useEffect, useState, useCallback } from 'react';
import { getDataFromStorage } from '../../data/response';
import ListItem from './ListItem';
import { weatherCodes } from '../../data/weather';
import { getAllCurrentWeatherByCity } from '../../data/response';
import { getTemperature } from '../../utils';
import { STORAGE_NAME } from '../../consts';
import { v1 as uuidv1 } from 'uuid';
import './style.css';

export default function List({ selectItem }) {
    const [items, setItems] = useState(null);
    const [weather, setWeather] = useState(null);

    const deleteItem = useCallback((city) => {
        const newList = items.filter(item => item.value !== city);
        localStorage.setItem(STORAGE_NAME, JSON.stringify(newList.map(item => item.value)));
        setItems(newList);
    }, [items]);

    const prepareWeatherData = useCallback((data) => data.map(item => {
        const { weathercode, temperature } = (item && item.current_weather) || {};
        const weatherObj = weatherCodes.find(item => item.code === weathercode);

        return {
            city: item.city,
            temperature: `${getTemperature(temperature)}` || '',
            classImage: weatherObj.image || '',
            describe: weatherObj.describe || '',
        }
    }), []);

    useEffect(() => {
        if (items === null) {
            const data = getDataFromStorage(STORAGE_NAME) || [];
            const newItems = data.map(item => ({ value: item, id: uuidv1() }));
            setItems(newItems);
        }
        
        if (items && items.length) {
            getAllCurrentWeatherByCity(items.map(item => item.value))
                .then(res => setWeather(prepareWeatherData(res || [])))
          
        }
    }, [items, prepareWeatherData]);

    return (
        <section>
            <div className='list'>
                {!!weather && !!items && items.map((item) => (
                    <div className='item' key={item.id} onClick={() => { selectItem(item.value) } }>
                        <ListItem
                            item={item.value}
                            weather={weather.find(weatherItem => weatherItem.city === item.value)}
                            deleteItem={deleteItem}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};