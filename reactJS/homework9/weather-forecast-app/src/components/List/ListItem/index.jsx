import React from 'react';
import './style.css';

export default function ListItem({ item, deleteItem, weather }) {
    const handleClickIcon = (e) => {
        e.stopPropagation();
        deleteItem(item);
    };

    const className = weather ? weather.classImage : null;
    const temperature = weather ? weather.temperature : '';
    const describe = weather ? weather.describe : '';

    return (
        <div className={`wrapper ${className}`}>
            <div className='box'>
                <i className='deleteIcon' onClick={handleClickIcon}></i>
                <div className='row'>
                    <div className='column column-8'>
                        <p className='cityName'>{item}</p>
                    </div>
                    <div className='column column-4'>
                        <p className='temperature'>{temperature}</p>
                    </div>
                </div> 
                <p className='describe'>{describe}</p>
            </div>
        </div>
    );
};