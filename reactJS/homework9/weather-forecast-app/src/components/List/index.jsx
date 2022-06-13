import React, { useEffect, useState, useCallback } from 'react';
import { getDataFromStorage } from '../../data/response';
import ListItem from './ListItem';
import { weatherCodes } from '../../data/weather';
import { getAllCurrentWeatherByCity } from '../../data/response';
import { getTemperature } from '../../utils';
import { STORAGE_NAME } from '../../consts';
import './style.css';

export default function List({ selectItem }) {
    const [items, setItems] = useState(null);
    const [weather, setWeather] = useState(null);

    const deleteItem = useCallback((city) => {
        const newList = items.filter(item => item !== city);
        localStorage.setItem(STORAGE_NAME, JSON.stringify(newList));
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
            setItems(getDataFromStorage(STORAGE_NAME));
        }
        
        if (items && items.length) {
            getAllCurrentWeatherByCity(items)
                .then(res => setWeather(prepareWeatherData(res || [])))
          
        }
    }, [items, prepareWeatherData]);

    return (
        <section>
            <div className='list'>
                {!!weather && items && items.map((item, i) => (
                    <div className='item' key={String(i)} onClick={() => { selectItem(item) } }>
                        <ListItem
                            item={item}
                            weather={weather.find(weatherItem => weatherItem.city === item)}
                            deleteItem={deleteItem}
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};