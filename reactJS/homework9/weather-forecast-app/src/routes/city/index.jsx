import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getCoordinatesByCity, getWeatherForcast, getDataFromStorage } from '../../data/response';
import { v1 as uuidv1 } from 'uuid';
import { getMonth, getDayOfWeek } from '../../utils';
import { STORAGE_NAME } from '../../consts';
import Carousel from '../../components/Carousel';
import Button from '../../components/Button';
import './style.css';
  
  export default function City() {
    const navigate = useNavigate();
    const location = useLocation();
    const cityName = location.search.slice(1).replace(/%20/g, ' ').replace(/%27/g, "'");

    const [cityCoordinates, setCityCoordinates] = React.useState(null);
    const [weather, setWeather] = React.useState(null);
    const [hasError, setError] = React.useState(false);

    if (cityCoordinates === null && cityName) {
      getCoordinatesByCity(cityName).then(data => { 
        setCityCoordinates(data);
        if (data.error) {
          setError(true);
        } else {
          getWeatherForcast(data).then(res => { 
            const preparedData = prepareWeatherData(res);
            setWeather(preparedData);
          });
        }
      });
    }

    const addCityToStorage = (city) => {
      const cities = getDataFromStorage(STORAGE_NAME) || [];
      const updatedCities = [...cities, city];
      localStorage.setItem(STORAGE_NAME, JSON.stringify(updatedCities));
    }

    const hasCityInStorage = (cityName) => {
      const cities = getDataFromStorage(STORAGE_NAME) || [];
      return cities.some((item) => item === cityName);
    }

    const handleClick = () => {
      addCityToStorage(cityName);
      goToHome();
    };

    const goToHome = () => {
      navigate('/');
    }

    const prepareWeatherData = (weather) => {
      const numberOfDays = 7;
      const numberOfHoursInOneDay = 24;
      const data = [];
  
      for (let dayIndex = 0; dayIndex < numberOfDays; dayIndex++) {
        const dataAboutOneDay = { id: uuidv1(), data: [] };

        for(let hourIndex = 0; hourIndex < numberOfHoursInOneDay; hourIndex++) {
          const { time, temperature_2m, weathercode } = weather.hourly;
          const index = (dayIndex * numberOfHoursInOneDay) + hourIndex;
          
          dataAboutOneDay.data.push({
            id: uuidv1(),
            time: new Date(time[index]),
            temperature: temperature_2m[index],
            code: weathercode[index],
          });
        }
        
        data.push(dataAboutOneDay);
      }

      return data;
    };

    const getDate = (data) => {
      const date = data.getDate();
      const month = getMonth(data);
      const dayOfWeek = getDayOfWeek(data);

      return `${date} ${month}, ${dayOfWeek}`;
    };

    const isDisplayAddButton = !hasCityInStorage(cityName) && !!weather;

    return (
        <main>
          <div className='row'>
            <div className='column column-9'>
              <Button
                value="Back to home"
                className="backBtn"
                onClick={goToHome}
              />
            </div>
            <div className='column column-3 txt-right'>
              {isDisplayAddButton && (
                <Button
                  value="Add to favorite list"
                  className="addBtn"
                  onClick={handleClick}
                />
              )}
            </div>
          </div>
          <h1>{cityName || ''}</h1>
          {hasError && !weather && (
            <p>Weather information is not provided for this location.</p>
          )}
          {!!weather && (
            <div className='row'>
              <div className='column column-12'>
                {weather.map((day, i) => {
                  const date = getDate(day.data[0].time);
                  const title = i === 0 ? `Today, ${date}` : date;
                  return (
                      <Carousel key={day.id} hours={day.data} title={title}/>
                  )}
                )}
              </div>
            </div>
          )}
        </main>
      );
}