import React from 'react';
import { weatherCodes } from '../../data/weather';
import { getTemperature, getHour } from '../../utils';
import './style.css';

export default function Carousel({ hours, title }) {

    return (
      <div className='carousel'>
        <p className='title'>{title}</p>
        <div className='container'>
          {hours.map((hour) => {
            const weatherCodeIndex = weatherCodes.findIndex(item => item.code === hour.code);
            const className = `wrapperWeather ${weatherCodes[weatherCodeIndex].image}`;
            const time = getHour(hour.time);
            const temperature = getTemperature(hour.temperature);
            const describe = weatherCodes[weatherCodeIndex].describe;
            
            return (
              <div key={hour.id} className='wrapperHour'>
                <p className='time'>{time}</p>
                <div className={className}>
                  <p className='temperature'>{temperature}</p>
                  <p className='describe'>{describe}</p>
                </div>
              </div>
            );
        })}
      </div>
    </div>
  );
};